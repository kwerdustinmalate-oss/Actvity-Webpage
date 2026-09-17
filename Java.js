 function showPage(pageName) {

      
            document.querySelectorAll(".page").forEach(function(page) {
                page.classList.remove("active");
            });

           
            document.getElementById(pageName).classList.add("active");

        
            document.getElementById("sfx").currentTime = 0;
            document.getElementById("sfx").play();
        }