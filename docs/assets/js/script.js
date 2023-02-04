let teamSelector= document.querySelector('#team-drop')
let opponentSelector = document.querySelector('#opp-drop')


let getMatchupList = function(){
  let allMatchups = document.querySelectorAll('.rec')
  let list = "";
  allMatchups.forEach(function(item){
    list = list + " " + item.classList.value
  })

  return list
}
listMatchups = getMatchupList()


let selectTeam = function(){

  let selectedTeam; let selectedOpp;
  allTeams = teamSelector.querySelectorAll('option')
  allOpps = opponentSelector.querySelectorAll('option')
  allRecords = document.querySelectorAll('td')

  allTeams.forEach(function(team){
    if(team.selected){ 
        allOpps.forEach(function(opp){
            if(opp.value == team.value){
              opp.setAttribute("hidden", "hidden")
            }
        })
        selectedTeam = team
        allRecords.forEach(function(item){
            if(item.classList.value.includes('val')){
            item.style.visibility="hidden"
            item.style.display = "none"
          }
        })
      }
  })

  allOpps.forEach(function(opp){
    if((opp.value != selectedTeam.value) && !opp.disabled){
      opp.removeAttribute("hidden")
    }
    else if(opp.selected && (opp.value == selectedTeam.value) && !opp.disabled){
      opponentSelector.selectedIndex = 0;       
    }
    
    if(opp.selected && !opp.disabled){
      selectedOpp = opp
    }
  })

  let isAvail = true;
  allRecords.forEach(function(record){
    if(selectedOpp){
      if(record.classList.value.includes(selectedTeam.value.toString() + " " + selectedOpp.value.toString())){        
        //console.log(record.classList)
        //record.style.visibility = "visible"
        //record.style.display = "table-cell"
        if(record.classList.value.includes('team win')){
          document.querySelector('.main.team.win').textContent = record.textContent
          document.querySelector('.team.cat').textContent = selectedTeam.textContent
        }
        if(record.classList.value.includes('opp win')){
          document.querySelector('.main.opp.win').textContent = record.textContent
          document.querySelector('.opp.cat').textContent = selectedOpp.textContent          
        }
        if(record.classList.value.includes('team point')){
          document.querySelector('.main.team.point').textContent = record.textContent
        }
        if(record.classList.value.includes('opp point')){
          document.querySelector('.main.opp.point').textContent = record.textContent
        }
      }
    }
  })

if(selectedTeam && selectedOpp){
  if(!listMatchups.includes(selectedTeam.value.toString() + " " + selectedOpp.value.toString()) && !selectedTeam.disabled){
    console.log("here")
    isAvail = false          
  }
}

  if(!isAvail){
    console.log("No record of this matchup. Please select new opponent")
    alert("No record of this matchup. Please select new opponent")
    teamSelector.selectedIndex = 0;
    opponentSelector.selectedIndex = 0;
  }


}

teamSelector.addEventListener("click",selectTeam)
opponentSelector.addEventListener("click",selectTeam)




