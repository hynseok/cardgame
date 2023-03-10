/*
추가기능
하나의 카드가 중복으로 선택될 수 없도록 하였습니다.
카드 선택 시 효과음이 울리도록 하였습니다.
짝이 맞을 시 효과음이 울리도록 하였습니다.
*/

const CardArr = [
    {
        name: "Kspade",
        img: "./img/Kspade.jpeg",
        id: null,
        check: false,
    },
    {
        name: "Kspade",
        img: "./img/Kspade.jpeg",
        id: null,
        check: false,
    },
    {
        name: "Qspade",
        img: "./img/Qspade.jpeg",
        id: null,
        check: false,
    },
    {
        name: "Qspade",
        img: "./img/Qspade.jpeg",
        id: null,
        check: false,
    },
    {
        name: "Jspade",
        img: "./img/Jspade.jpeg",
        id: null,
        check: false,
    },
    {
        name: "Jspade",
        img: "./img/Jspade.jpeg",
        id: null,
        check: false,
    },
    {
        name: "Aspade",
        img: "./img/Aspade.jpeg",
        id: null,
        check: false,
    },
    {
        name: "Aspade",
        img: "./img/Aspade.jpeg",
        id: null,
        check: false,
    },
    {
        name: "Kheart",
        img: "./img/Kheart.jpeg",
        id: null,
        check: false,
    },
    {
        name: "Kheart",
        img: "./img/Kheart.jpeg",
        id: null,
        check: false,
    },
    {
        name: "Qheart",
        img: "./img/Qheart.jpeg",
        id: null,
        check: false,
    },
    {
        name: "Qheart",
        img: "./img/Qheart.jpeg",
        id: null,
        check: false,
    },
    {
        name: "Jheart",
        img: "./img/Jheart.jpeg",
        id: null,
        check: false,
    },
    {
        name: "Jheart",
        img: "./img/Jheart.jpeg",
        id: null,
        check: false,
    },
    {
        name: "Aheart",
        img: "./img/Aheart.jpeg",
        id: null,
        check: false,
    },
    {
        name: "Aheart",
        img: "./img/Aheart.jpeg",
        id: null,
        check: false,
    },
];
const GameDOM = [];
let FirstClick = -1;
let SecondClick = -1;
let ClickCount = 0;
let CorrectPair = 0;
const getDOM = () => {
    const rows = document.querySelectorAll(".container .row");
    for(let i=0;i<rows.length;i++){
        GameDOM[i] = rows[i].querySelectorAll(".column");
    }
};

const setID = () => {
    CardArr[0].id = "0-0";
    CardArr[1].id = "0-1";
    CardArr[2].id = "0-2";
    CardArr[3].id = "0-3";
    CardArr[4].id = "1-0";
    CardArr[5].id = "1-1";
    CardArr[6].id = "1-2";
    CardArr[7].id = "1-3";
    CardArr[8].id = "2-0";
    CardArr[9].id = "2-1";
    CardArr[10].id = "2-2";
    CardArr[11].id = "2-3";
    CardArr[12].id = "3-0";
    CardArr[13].id = "3-1";
    CardArr[14].id = "3-2";
    CardArr[15].id = "3-3";
}; 

const setClick = (location) => {
    if(FirstClick === -1){
        FirstClick = location;
        let clickSound = new Audio('./bgm/click.mp3');
        clickSound.play();
    }
    else{
        SecondClick = location;
        if(FirstClick!==SecondClick){
            let clickSound = new Audio('./bgm/click.mp3');
            clickSound.play();
        }
    }
};

const backflip = () => {
    const FirstParsedID = CardArr[FirstClick].id.split("-");
    const SecondParsedID = CardArr[SecondClick].id.split("-");

    let stopFunc = function(event) { event.preventDefault(); event.stopPropagation(); return false; };
    let all = document.querySelectorAll('*');
    for(let idx in all){
        let el = all[idx];
        if(el.addEventListener){
            el.addEventListener('click', stopFunc, true);
        }
    }
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 500);
    }).then(() => {
        GameDOM[FirstParsedID[0]][FirstParsedID[1]].querySelector("img").src = "./img/back.jpeg";
        GameDOM[SecondParsedID[0]][SecondParsedID[1]].querySelector("img").src = "./img/back.jpeg";
    }).then(() => {
        for(let idx in all){
            let el = all[idx];
            if(el.removeEventListener){
                el.removeEventListener('click', stopFunc, true);
            }
        }
    })

    
};

const isMatch = () => {
    if(FirstClick===SecondClick){
        ClickCount = 1;
        SecondClick = -1;
        return;
    }
    if(CardArr[FirstClick].name === CardArr[SecondClick].name){
        let matchSound = new Audio('./bgm/match.mp3');
        matchSound.play();
        CardArr[FirstClick].check = true;
        CardArr[SecondClick].check = true;
        CorrectPair++;
        if(CorrectPair === 8){
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 500);
            }).then(() => {
                if(confirm("게임 오버! 재시작하시겠습니까?") == true){
                    location.reload();
                }
            })
        }
    }
    else
    {
        backflip();
    }
};

const flip = (location) => {
    if(!CardArr[location].check){
        setClick(location);
        const parseID = CardArr[location].id.split("-");
        GameDOM[parseID[0]][parseID[1]].querySelector("img").src = CardArr[location].img;
        ClickCount++;
        if(ClickCount === 2){
            ClickCount = 0;
            isMatch();
        }
        if(FirstClick !== -1 && SecondClick !== -1){
            FirstClick = -1;
            SecondClick = -1;
        }
    }
};


const StartGame = () => {
    getDOM();
    CardArr.sort(() => 0.5 - Math.random());
    setID();
    for(let i=0;i<GameDOM.length;i++){
        for(let j=0;j<GameDOM[i].length;j++){
            const card = document.createElement("img");
            card.setAttribute("src","");
            card.setAttribute("style","width: 100%; height: auto");
            card.classList.add("eachImage");
            GameDOM[i][j].appendChild(card);
            GameDOM[i][j].querySelector("img").src = CardArr[4*i+j].img;
        }
    }
    setTimeout(() => {
        for(let i=0;i<GameDOM.length;i++){
            for(let j=0;j<GameDOM[i].length;j++){
                GameDOM[i][j].querySelector("img").src = "./img/back.jpeg";
            }
        }
    }, 3000);
};

onload = () => {
    StartGame();
    document.getElementById("btn").addEventListener('click', () => {
        location.reload();
    });
};

