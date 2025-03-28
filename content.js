(function() {
    const clubMapping = {
        // Serie A 2025
        "CAM": "images/CAM.png",   // Atlético Mineiro
        "BAH": "images/BAH.png",   // Bahia
        "BOT": "images/BOT.png",   // Botafogo
        "CEA": "images/CEA.png",   // Ceará
        "COR": "images/COR.png",   // Corinthians
        "CRU": "images/CRU.png",   // Cruzeiro
        "FLA": "images/FLA.png",   // Flamengo
        "FLU": "images/FLU.png",   // Fluminense
        "FOR": "images/FOR.png",   // Fortaleza
        "GRE": "images/GRE.png",   // Grêmio
        "INT": "images/INT.png",   // Internacional
        "JUV": "images/JUV.png",   // Juventude
        "MIR": "images/MIR.png",   // Mirassol
        "PAL": "images/PAL.png",   // Palmeiras
        "RBB": "images/RBB.png",   // Red Bull Bragantino
        "SAN": "images/SAN.png",   // Santos
        "SAO": "images/SAO.png",   // São Paulo
        "SPT": "images/SPT.png",   // Sport
        "VAS": "images/VAS.png",   // Vasco da Gama
        "VIT": "images/VIT.png"    // Vitória
      };
  
    function updateClubImages() {
      console.log("cartolaraiz executado");
      const imgs = document.querySelectorAll("img[src*='/clubes_2025/escudos/'], img[ng-src*='/clubes_2025/escudos/']");
      
      imgs.forEach(img => {
        let src = img.getAttribute("src") || img.getAttribute("ng-src") || "";
        console.log("Imagem encontrada:", src);
        
        const regex = /\/clubes_2025\/escudos\/([^/]+)\//;
        const match = src.match(regex);
        
        if (match && match[1]) {
          const clubCode = match[1].toUpperCase();
          console.log("Código do clube:", clubCode);
          if (clubMapping[clubCode]) {
            const newURL = chrome.runtime.getURL(clubMapping[clubCode]);
            console.log("Substituindo por:", newURL);
            img.setAttribute("src", newURL);
            if (img.hasAttribute("ng-src")) {
              img.setAttribute("ng-src", newURL);
            }
          } else {
            console.log("Nenhuma imagem mapeada para:", clubCode);
          }
        }
      });
    }
  
    setTimeout(updateClubImages, 3000);
  
    const observer = new MutationObserver((mutationsList) => {
      console.log("MutationObserver ativado");
      mutationsList.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          updateClubImages();
        }
      });
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
  })();
  