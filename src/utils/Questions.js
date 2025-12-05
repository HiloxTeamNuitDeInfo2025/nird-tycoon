export const QUESTIONS = [
  {
    title: "Operating System Migration",
    question: "Windows 10 support ends in 30 days. The board wants your recommendation for all school computers.",
    choices: [
      {
        name: "Linux (Ubuntu LTS)",
        timeCost: 7,
        budgetCost: 0,
        points: 15,
        confirm: {
          question: "Why recommend Linux?",
          correct: "Independence from Microsoft + 100% free forever",
          wrong: "It's easier for teachers",
          correctBoost: 15,
          wrongPenalty: -15,
        },
      },
      {
        name: "Windows 11",
        timeCost: 0,
        budgetCost: 20000,
        points: 0,
        confirm: {
          question: "Why Windows 11?",
          correct: "Saves time setting up everything else + staff comfort",
          wrong: "More secure than Linux",
          correctBoost: 10,
          wrongPenalty: -20,
        },
      },
    ],
  },
  {
    title: "Office Productivity Suite",
    question: "Word, Excel, PowerPoint… What will replace the current tools?",
    choices: [
      { name: "LibreOffice", timeCost: 0, budgetCost: 0, points: 10 },
      { name: "Microsoft 365", timeCost: 0, budgetCost: 0, points: 0 },
    ],
  },
  {
    title: "Network Security & Management",
    question: "Firewall and antivirus are non-negotiable. How do we protect the school?",
    choices: [
      { name: "pfSense + ClamAV", timeCost: 5, budgetCost: 0, points: 10 },
      { name: "Avast Business + Managed Firewall", timeCost: 0, budgetCost: 20000, points: 0 },
    ],
  },
  {
    title: "Finance & Accounting",
    question: "Budgeting, invoicing, accounting — we need a solid solution.",
    choices: [
      {
        name: "GnuCash",
        timeCost: 6,
        budgetCost: 0,
        points: 10,
        confirm: {
          question: "Why GnuCash?",
          correct: "100% free and no subscription ever",
          wrong: "It's easier than Odoo",
          correctBoost: 12,
          wrongPenalty: -12,
        },
      },
      {
        name: "Odoo Enterprise",
        timeCost: 0,
        budgetCost: 25000,
        points: 0,
        confirm: {
          question: "Why Odoo?",
          correct: "Saves huge time on setup & training",
          wrong: "Cheaper in the long run",
          correctBoost: 10,
          wrongPenalty: -15,
        },
      },
    ],
  },
  {
    title: "Learning Management System",
    question: "Platform for lessons, homework, grades and progress tracking.",
    choices: [
      { name: "Moodle", timeCost: 4, budgetCost: 0, points: 10 },
      { name: "Google Classroom / Teams for Education", timeCost: 0, budgetCost: 20000, points: 0 },
    ],
  },
  {
    title: "Parent & Student Portal",
    question: "A portal so families can see grades, schedules and news.",
    choices: [
      { name: "Fedena / RosarioSIS", timeCost: 4, budgetCost: 0, points: 9 },
      { name: "EduPage / Skolengo", timeCost: 0, budgetCost: 20000, points: 0 },
    ],
  },
  {
    title: "Student Information System",
    question: "Central system for enrollment, attendance, report cards…",
    choices: [
      { name: "OpenSIS", timeCost: 6, budgetCost: 0, points: 10 },
      { name: "PowerSchool / EduSoft", timeCost: 0, budgetCost: 25000, points: 0 },
    ],
  },
  {
    title: "Communication & Collaboration",
    question: "Video calls, chat, shared docs — daily collaboration tools.",
    choices: [
      { name: "Element (Matrix) + Jitsi", timeCost: 3, budgetCost: 0, points: 16 },
      { name: "Zoom EDU + Slack EDU", timeCost: 0, budgetCost: 20000, points: 0 },
    ],
  },
];