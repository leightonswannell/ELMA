let page = document.getElementById('buttonDiv');
  const kButtonColors = ['#fff', '#000', '#2de18a'];
  function constructOptions(kButtonColors) {
    for (let item of kButtonColors) {
      let button = document.createElement('button');
      button.style.backgroundColor = item;
      button.value = item;
      button.addEventListener('click', function() {
        chrome.storage.sync.set({maskColor: item}, function() {
          console.log('color is ' + item);
        })
      });
      page.appendChild(button);
    }
  }
  constructOptions(kButtonColors);