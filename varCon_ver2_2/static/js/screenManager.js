

let fullScreenActive = false
let initialScreenSize = screen.width


function normalScreenMode() 
{ 
    if (document.exitFullscreen) {
      document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
      }
      fullScreenActive = false;
      ws = document.getElementById('workSheet');
      ws.style.transform = 'scale(1,1)'
}

function gofullScreenMode() 
{ 

  var elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
      // } else if (elem.webkitRequestFullscreen) { /* Safari */
      //   elem.webkitRequestFullscreen();
      // } else if (elem.msRequestFullscreen) { /* IE11 */
      //   elem.msRequestFullscreen();
      }
    fullScreenActive = true
}



  window.addEventListener('resize', AdjustFullScreen);
 
function AdjustFullScreen()
  {
    console.log('AdjustFullScreen() running fullScreenActive =', fullScreenActive )
    if ( fullScreenActive == true) 
      {
        ws = document.getElementById('workSheet');

        if ( initialScreenSize == 412 || initialScreenSize == 869 )// NOTE 10
          {
            if ( screen.width <=412 )
            {
              ws.style.transformOrigin = 'top left'
              ws.style.transform = 'scale(.65,.65)'
            }
            if ( screen.width > 412 )
              {
                ws.style.transformOrigin = 'top left'
                ws.style.transform = 'scale(1.2, 1.2)'
              }
          }
          if ( initialScreenSize == 360 || initialScreenSize == 640 )// G4 and NOTE 2
          {
            if ( screen.width <=360 )
            {
              ws.style.transformOrigin = 'top left'
              ws.style.transform = 'scale(.55,.55)'
            }
            if ( screen.width >360)
              {
                ws.style.transformOrigin = 'top left'
                ws.style.transform = 'scale(.9, .9)'
              }
          }
          
      }
  }


  AdjustFullScreen();
