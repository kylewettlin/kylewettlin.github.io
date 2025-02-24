const drawStairsBtn    = document.getElementById('drawStairsBtn');
const climbStairsBtn   = document.getElementById('climbStairsBtn');
const ladderContainer  = document.getElementById('ladderContainer');
const climber          = document.getElementById('climber');

drawStairsBtn.addEventListener('click', () => {
  const existingRungs = ladderContainer.querySelectorAll('.rung');
  existingRungs.forEach(rung => rung.remove());

  const totalRungs = 10;
  const containerHeight = ladderContainer.clientHeight;
  const stepSize = containerHeight / (totalRungs + 1);

  for (let i = 0; i < totalRungs; i++) {
    const rung = document.createElement('div');
    rung.classList.add('rung');
    const rungTop = containerHeight - (stepSize * (i+1));
    rung.style.top = rungTop + 'px';
    ladderContainer.appendChild(rung);
  }

  climbStairsBtn.style.display = 'inline-block';
  climber.style.display = 'block';
  climber.style.top = (containerHeight - 80) + 'px';
});

climbStairsBtn.addEventListener('click', () => {
  climbStairsBtn.disabled = true;
  let currentRung = 0;
  const totalRungs = 10;
  let isLeftFoot = true;

  const containerHeight = ladderContainer.clientHeight;
  const stepSize = containerHeight / (totalRungs + 1);
  const startPosition = containerHeight - 80; 
  
  const climbInterval = setInterval(() => {
    if (currentRung >= totalRungs) {
      clearInterval(climbInterval);
      climbStairsBtn.disabled = false;
      return;
    }

    const newTop = startPosition - (stepSize * currentRung);
    climber.style.top = newTop + 'px';
    climber.src = isLeftFoot ? 'images/right.png' : 'images/left.png';
    isLeftFoot = !isLeftFoot;
    currentRung++;
    
  }, 800);
});

drawStairsBtn.addEventListener('click', () => {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
  climbStairsBtn.disabled = false;
});
