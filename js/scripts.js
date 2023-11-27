$(function() {


// Helper functions 
function getProjectType(projectType) {
  let typeOfProject; 

  switch (projectType) {
    case "Road construction": 
    typeOfProject = "Vejkonstruktion"; 
      break; 
    case "Commercial": 
    typeOfProject = "Kommercielt"; 
      break; 
    case "Industrial": 
    typeOfProject = "Industriel"; 
      break;
    case "Residentiel": 
    typeOfProject = "Beboelse"; 
      break;
  }

  return typeOfProject;
}

function buildProjectContent(projectType, projectId, projectName, projectStatus, projectEstBudget, projectEstTime, projectEstManHours, projectEstMaterialExpenses) {
  const result = ""; 

  // Formatting
  const paragraphOpen = '<p>';
  const paragraphClose = '</p>';
  const headerOpen = '<h6>';
  const headerClose = '</h6>'; 
 
  console.log("Hello from buildProjectContent"); 

  return result;
}

// Load projects and show
function getProjects() {
  $.getJSON('\project_test_data_50_projects.json', showProjects)
}


function showProjects(jsonObj){
  const projectsWrapper = $("#projectsPlaceholder"); 

  let projectContent = ''; // Til alt indhold
  let projectcontentSmall = ''; 
  let colSize = ''; // Variabel til at skifte mellem col-sizes
  let isBigCol = true; 
  let isLastInRow = false; 

  for (const project of jsonObj) {
    const projectIndex = jsonObj.indexOf(project); 

    function getProject() {
      const projectType = getProjectType(project.projectType);
      const projectId = project.projectId;
      const projectName = project.projectName;
      const projectStatus = project.projectStatus;
      const projectEstBudget = project.projectBudget;
      const projectEstTime = project.projectEstimatedTime;
      const projectEstManHours = project.projectEstimatedManHours;
      const projectEstMaterialExpenses = project.projectEstimatedMaterialExpenses;

      projectContainer = buildProjectContent(); 
    }

    // Definere placering for det pågældende projekt i griddet
    if (projectIndex % 3 === 0) {
      isBigCol = true; 
      isLastInRow = false; 
    } else if (projectIndex % 3 === 1) {
      isBigCol = false; 
      isLastInRow = false; 
    } else {
      isBigCol = false; 
      isLastInRow = true; 
    }
    
    // Baseret på placering, lav eventuelt ny row og tilføj en <div> med rette størrelse
    if (isBigCol) {
      projectContent += '<div class="row project-row">'; 
      colSize = 'col-lg-8';
      projectContent += `<div class="col-12 ${colSize} project-container">`;
    } else if (!isLastInRow) {
      colSize = 'col-lg-4'; 
      projectContent += `<div class="col-12 ${colSize} project-small">`;
      projectContent += '<div class="row flex-column">'; 
    }

    // Indsæt projektdata og luk <div>
    if (isBigCol) {
      getProject(); 
      projectContent += projectContainer;
      projectContent += '</div>'; 
    } else {
      getProject(); 
      projectcontentSmall += '<div class="col-12 project-container">'; 
      projectcontentSmall += projectContainer;
      projectcontentSmall += '</div>';

      projectContent += projectcontentSmall; 
    }

    projectcontentSmall = ""; 
    
    if (isLastInRow) {
      projectContent += '</div>';
      projectContent += '</div>';
      projectContent += '</div>'; 
    }
  }

  projectsWrapper.html(projectContent); 
}

getProjects(); 

});
