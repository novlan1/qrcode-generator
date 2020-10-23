let _list = []

document.addEventListener('click', onBindClick)

var qrcode = new QRCode(document.getElementById("qrcode"), {
  width: 150,
  height: 150
});

getList()
makeCode();

$("#text").
  on("blur", function () {
    // makeCode();
  }).
  on("keydown", function (e) {
    if (e.keyCode == 13) {
      console.log('generating...')
      makeCode();
    }
  });


function getList() {
  try {
    if (localStorage.getItem('_list')) {
      _list = JSON.parse(localStorage.getItem('_list'))
    } else {
      localStorage.setItem('_list', JSON.stringify([]))
    }
  } catch (e) {

  }
}

function makeCode() {
  var elText = document.getElementById("text");

  if (!elText.value) {
    alert("Input a text");
    elText.focus();
    return;
  }
  _list = Array.from(new Set([elText.value, ..._list,]))
  localStorage.setItem('_list', JSON.stringify(_list))
  updateHistory()
  qrcode.makeCode(elText.value);
}

function onBindClick(e) {
  const { classList, dataset } = e.target
  if (classList.contains('history-delete-btn')) {
    const { title } = dataset
    const index = _list.indexOf(title)
    _list.splice(index, 1)
    localStorage.setItem('_list', JSON.stringify(_list))
    updateHistory()
  }
}

function updateHistory() {
  const _historyWrap = document.getElementById('historyListUl')
  let _html = ''
  _list.map(item => {
    _html += `
      <li>
        <span class="history-name">${item}</span>
        <span style="cursor: pointer;padding: 0 4px;" class='history-delete-btn' data-title='${item}'>X</span>
      </li>
    `
  })
  _historyWrap.innerHTML = _html
}

