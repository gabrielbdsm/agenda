eventForm.addEventListener('submit',async function(event) {
    const tasklist = document.getElementById('Lista_tarefa');
    
    event.preventDefault();
    
    const row = tasklist.insertRow(-1)
    const addList = await addTasjList(row)
    if(!addList.message){
      alert("Tarefa não salva")
      return
    }
    
    const taskFinishCell = row.insertCell()
    const taskFinishButton = document.createElement('button')
    taskFinishButton.textContent = 'Finalizar Tarefa'
    taskFinishButton.addEventListener('click', function() {

      tasklist.deleteRow(row.rowIndex)
      taskFinishTask(addList.taskId)
    });
    taskFinishCell.appendChild(taskFinishButton)
});

async function addTasjList (row){
  const time = document.getElementById('time').value
  const eventDescription = document.getElementById('event').value
  
  const send = await sendForm(eventDescription , time)
  
  if(send.message){

      const timeCell = row.insertCell()
      const eventCell = row.insertCell()
      
      
      eventCell.textContent = eventDescription
      timeCell.textContent = time
      
      document.getElementById('time').value = ''
      document.getElementById('event').value = ''
      
      return send
    }else{
      return send.message
    }
}

async function sendForm (eventDescription , time){
  const today = new Date();
  const [hours, minutes] = time.split(':');
  today.setHours(parseInt(hours, 10));
  today.setMinutes(parseInt(minutes, 10));

  const formData = {
    description : eventDescription,
    time : today.toISOString()
}

  const response = await fetch("/Lista_tarefa", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error('Erro ao enviar dados');
    }
    const res = await response.json()

    return res
    

}

async function taskFinishTask (taskId){
  console.log(taskId)
  const response = await fetch("/Lista_tarefa", {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
    },
    body: JSON.stringify({ taskId: taskId})
  });

  if (!response.ok) {
    throw new Error('Erro ao enviar dados');
  }

} 