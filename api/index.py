import os
from dotenv import load_dotenv
from langchain_core.tools import BaseTool
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_openai import ChatOpenAI
from typing import Optional, Any
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from langchain_core.chat_history import BaseChatMessageHistory, InMemoryChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.runnables import RunnableConfig
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Load environment variables from .env file
load_dotenv()

app = FastAPI(title="MiniMind Open Source Advisor API")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your React app's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class OpenSourceToolInput(BaseModel):
    """Input schema for the OpenSourceTool"""
    question: str = Field(description="Question about open-source software")
    session_id: Optional[str] = Field(default="default", description="Session ID for chat history")


class ChatRequest(BaseModel):
    """Request body for chat endpoint"""
    question: str
    session_id: Optional[str] = "default"


class ChatResponse(BaseModel):
    """Response body for chat endpoint"""
    answer: str
    session_id: str


class OpenSourceTool(BaseTool):
    """Tool for answering questions about open-source software alternatives"""

    name: str = "open_source_advisor"
    description: str = """
    Use this tool to answer questions about open-source software alternatives.
    The tool can provide information about: Linux, LibreOffice, PfSense, ClamAV,
    GnuCash, Moodle, Fedena, OpenSIS, Element and Jitsi.
    Input should be a question about any of these tools.
    """
    args_schema: type[BaseModel] = OpenSourceToolInput
    chat_history: dict[str, BaseChatMessageHistory] = Field(default_factory=dict)
    instructions: str = ""
    llm: Any = None
    prompt: Any = None
    chain: Any = None
    chain_with_history: Any = None

    model_config = ConfigDict(arbitrary_types_allowed=True)

    def __init__(self):
        super().__init__()
        # Load instruction file
        instruction_path = Path(__file__).parent / "Instruction.txt"
        with open(instruction_path, 'r', encoding='utf-8') as f:
            instructions_content = f.read()

        # Initialize the LLM with OpenRouter (Llama 3.3 70B)
        llm_instance = ChatOpenAI(
            model=os.getenv("OPEN_ROUTER_MODEL"),
            openai_api_key=os.getenv("OPEN_ROUTER_API_KEY"),
            openai_api_base="https://openrouter.ai/api/v1",
            temperature=0.7
        )

        # Create prompt template with chat history
        prompt_template = ChatPromptTemplate.from_messages([
            ("system", instructions_content),
            MessagesPlaceholder(variable_name="chat_history"),
            ("human", "{question}")
        ])

        # Create chain
        chain_instance = prompt_template | llm_instance

        # Create chain with message history
        chain_with_history_instance = RunnableWithMessageHistory(
            runnable=chain_instance,
            get_session_history=self._get_session_history,
            input_messages_key="question",
            history_messages_key="chat_history"
        )

        # Set attributes after super().__init__()
        object.__setattr__(self, 'instructions', instructions_content)
        object.__setattr__(self, 'llm', llm_instance)
        object.__setattr__(self, 'prompt', prompt_template)
        object.__setattr__(self, 'chain', chain_instance)
        object.__setattr__(self, 'chain_with_history', chain_with_history_instance)

    def _get_session_history(self, session_id: str) -> BaseChatMessageHistory:
        """Get or create chat history for a session"""
        if session_id not in self.chat_history:
            self.chat_history[session_id] = InMemoryChatMessageHistory()
        return self.chat_history[session_id]

    def _run(self, question: str, session_id: str = "default") -> str:
        """Execute the tool to answer open-source questions"""
        try:
            config = RunnableConfig(configurable={"session_id": session_id})
            response = self.chain_with_history.invoke(
                {"question": question},
                config=config
            )
            return response.content

        except Exception as e:
            return f"Error processing question: {str(e)}"

    async def _arun(self, question: str, session_id: str = "default") -> str:
        """Async version of the tool"""
        return self._run(question, session_id)

    def clear_history(self, session_id: str = "default") -> None:
        """Clear chat history for a session"""
        if session_id in self.chat_history:
            self.chat_history[session_id].clear()

    def get_all_sessions(self) -> list[str]:
        """Get list of all active session IDs"""
        return list(self.chat_history.keys())


# Initialize the tool globally
tool = OpenSourceTool()

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "MiniMind Open Source Advisor API",
        "docs": "/docs",
        "endpoints": {
            "chat": "POST /chat",
            "clear_history": "DELETE /history/{session_id}",
            "sessions": "GET /sessions",
            "health": "GET /health"
        }
    }


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Send a question and get an answer about open-source software"""
    try:
        answer = tool._run(request.question, request.session_id)
        return ChatResponse(answer=answer, session_id=request.session_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/history/{session_id}")
async def clear_history(session_id: str):
    """Clear chat history for a specific session"""
    tool.clear_history(session_id)
    return {"message": f"History cleared for session: {session_id}"}


@app.get("/sessions")
async def get_sessions():
    """Get all active session IDs"""
    return {"sessions": tool.get_all_sessions()}


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)