function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function assignSecretSanta(employees, previousAssignments) {
    let availableRecipients = employees.map((e) => ({ ...e }));
    shuffleArray(availableRecipients);
  
    const newAssignments = [];
    for (const giver of employees) {
      let recipientIndex = availableRecipients.findIndex(
        (r) =>
          r.Employee_EmailID !== giver.Employee_EmailID &&
          !previousAssignments.some(
            (prev) =>
              prev.Employee_EmailID === giver.Employee_EmailID &&
              prev.Secret_Child_EmailID === r.Employee_EmailID
          )
      );
  
      if (recipientIndex === -1) {
        throw new Error("Failed to assign secret santa without duplicates.");
      }
  
      const recipient = availableRecipients.splice(recipientIndex, 1)[0];
      newAssignments.push({
        Employee_Name: giver.Employee_Name,
        Employee_EmailID: giver.Employee_EmailID,
        Secret_Child_Name: recipient.Employee_Name,
        Secret_Child_EmailID: recipient.Employee_EmailID,
      });
    }
  
    return newAssignments;
  }
  
  module.exports = { assignSecretSanta };
  