export const generateContent = async (systemPrompt: string, userMessage: string, chatHistory: any[] = []) => {
  // Mock AI response
  const lowerMsg = userMessage.toLowerCase();
  
  if (lowerMsg.includes('seat') || lowerMsg.includes('find')) {
    return "Your seat is located in Section 114, Row B, Seat 42. It's accessible via Gate 2B. Let me know if you need directions!";
  } else if (lowerMsg.includes('food') || lowerMsg.includes('eat')) {
    return "There are several food options near your section. 'Stadium Grille' is 5 minutes away with a 10-minute wait time. Would you like to see the menu?";
  } else if (lowerMsg.includes('schedule') || lowerMsg.includes('tournament')) {
    return "The current tournament has 16 teams. The next match is Falcons vs Eagles today at 19:00. The knockout phase begins next week.";
  } else if (lowerMsg.includes('emergency') || lowerMsg.includes('security')) {
    return "If you have a security concern, please contact the nearest staff member immediately, or use the 'Report Incident' feature in the app. Staff have been alerted to monitor the area.";
  }
  
  return `I am the local Mock AI Assistant. I received your message: "${userMessage}". Since this is a local offline version, my capabilities are simulated. How else can I help you today?`;
};

export const generateCompletion = async (prompt: string) => {
  // Mock AI completion
  if (prompt.includes('announcement')) {
    return "Attention all fans: Please be advised of the current situation. We request that you remain calm and follow instructions from stadium personnel. Thank you for your cooperation.";
  } else if (prompt.includes('emergency')) {
    return "### Emergency Response Plan\n- **Evacuation Procedure:** Direct fans to nearest exits (Gates 1, 3, 5).\n- **Required Staff:** 12 Security, 4 Medical.\n- **Priority:** High.\n- **Estimated Response:** 2 minutes.\n- **Action:** Alert all personnel in Sector 4.";
  }
  
  return "Simulated AI completion based on your prompt. (Offline Mode)";
};
