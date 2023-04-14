
// **************** Creating Chess Board ********************

let board = document.querySelector(".board");
for(let i=8;i>0;i--){
// ###
    let row = document.createElement('div');
    row.classList.add("row");
    board.appendChild(row);
    for(let j=1;j<9;j++){
        let newSq = document.createElement("div");
        newSq.classList.add("square");
        newSq.classList.add("peiceBgSetting");
        newSq.setAttribute("x",i);
        newSq.setAttribute("y",j);
        if((i+j)%2==0){
            newSq.classList.add("darkSquare");
        }
        else{
            newSq.classList.add("lightSquare");
        }
        row.appendChild(newSq);
    }
}


// ******************** Adding Peices ************************

let blackPeicesOrder = ["BRook","BKnight","BBishop","BQueen","BKing","BBishop","BKnight","BRook"];
let whitePeicesOrder = ["WRook","WKnight","WBishop","WQueen","WKing","WBishop","WKnight","WRook"];
for(let i=0;i<8;i++){
    document.querySelector(`[x="8"][y="${i+1}"]`).classList.add(blackPeicesOrder[i]);
    document.querySelector(`[x="7"][y="${i+1}"]`).classList.add("BPawn");
    document.querySelector(`[x="1"][y="${i+1}"]`).classList.add(whitePeicesOrder[i]);
    document.querySelector(`[x="2"][y="${i+1}"]`).classList.add("WPawn");
}

let peicesClasses = ["BRook","BKnight","BBishop","BQueen","BKing","BPawn","WRook","WKnight","WBishop","WQueen","WKing","WPawn"];
let blackPeicesClasses = ["BRook","BKnight","BBishop","BQueen","BKing","BPawn"];
let whitePeicesClasses = ["WRook","WKnight","WBishop","WQueen","WKing","WPawn"];
let capturedPieces = [];


// ******************** isEmptySquare *************************

function isEmptySquare(destinationSquare){
    for(let i=0;i<peicesClasses.length;i++){
        if(destinationSquare.classList.contains(peicesClasses[i])){
            return false;
        }
    }
    return true;
}


// ****************** Checking Piece Color *******************

function pieceColor(piece){
    for(let i=0;i<whitePeicesClasses.length;i++){
        if(piece.classList.contains(whitePeicesClasses[i])){
            return "white";
        }
    }
    return "black";
}
function isWhitePiece(piece){
    for(let i=0;i<6;i++){
        if(piece.classList.contains(whitePeicesClasses[i])){
            return true;
        }
    }
}
function isBlackPiece(piece){
    for(let i=0;i<6;i++){
        if(piece.classList.contains(blackPeicesClasses[i])){
            return true;
        }
    }
}


// ***************** has opposite color piece ****************

function hasSameColorPiece(selectedPiece, destinationSquare){
    let isBlack = 0;
    for(let i=0;i<6;i++){
        if(selectedPiece == blackPeicesClasses[i]){
            isBlack=1;
        }
   
    }
    for(let i=0;i<6;i++){
        if(isBlack==1 && isBlackPiece(destinationSquare)){
            return 1;
        }
        else if(isBlack==0 && isWhitePiece(destinationSquare)){
            return 1;
        }
    }
    return 0;
}


// ******************** Moving Pieces *************************

let currentColor = "white";
let chosenPiece = "";
let currentSquare;

document.querySelector(".board").addEventListener("click", (event) =>{
    // Picking Up a Piece
    if(chosenPiece=="" && !event.target.classList.contains("capturedPiece")){
        let pieceWasSelected = 0;
        currentSquare = event.target;
        for(let i=0;i<whitePeicesClasses.length;i++){
            if(currentColor === "white" && event.target.classList.contains(whitePeicesClasses[i])){
                chosenPiece = whitePeicesClasses[i];
                event.target.classList.remove(whitePeicesClasses[i]);
                currentColor = "black";
                pieceWasSelected = 1;
            }
            else if(currentColor === "black" && event.target.classList.contains(blackPeicesClasses[i])) {
                chosenPiece = blackPeicesClasses[i];
                event.target.classList.remove(blackPeicesClasses[i]);
                currentColor = "white";
                pieceWasSelected = 1;
            }
        }
        if(pieceWasSelected === 0){
            AlertNotif(`⚠️ Its ${currentColor}s move`);
        }
    }
    // Dropping A Piece 
    else{
        if(event.target.classList.contains("square") && !hasSameColorPiece(chosenPiece, event.target)){
            if(currentSquare != event.target){
                for(let i=0;i<peicesClasses.length;i++){
                    if(event.target.classList.contains(peicesClasses[i])){
                        event.target.classList.remove(peicesClasses[i]);
                        capturedPieces.push(peicesClasses[i]);
                        addToDropbox(peicesClasses[i]);
                    }
                }
                event.target.classList.add(chosenPiece);
                chosenPiece = "";
            }
            else{
                AlertNotif("⚠️ Cant place piece on the same square it was picked from.");
            }
            
        }  
    }
})


// **************** Adding Dropped Pieces to DropBox ****************
function addToDropbox(capturedPiece){
    let dropbox = document.querySelector(".blackdropbox");
    for(let i=0;i<whitePeicesClasses.length;i++){
        if(capturedPiece===whitePeicesClasses[i]){
            dropbox = document.querySelector(".whitedropbox");
        }
    }
    let newCapturedPiece = document.createElement("div");
    newCapturedPiece.classList.add(capturedPiece);
    newCapturedPiece.classList.add("capturedPieceDisplayClass");
    newCapturedPiece.classList.add("peiceBgSetting");
    newCapturedPiece.classList.add("capturedPiece");
    dropbox.appendChild(newCapturedPiece);
}

// ************* Piece cant be placed on the square it was picked from ****************
let cancelCount = 0;
function AlertNotif(message){
    let alertmessage = document.createElement("div");
    alertmessage.classList.add("alertmessage");
    
        let cancelButton = document.createElement("button");
        cancelButton.classList.add("cancelbutton");
        cancelButton.innerText="X";
        alertmessage.classList.add(`cancelNumber${cancelCount}`);
        cancelButton.classList.add(`cancelNumber${cancelCount}`);
        alertmessage.appendChild(cancelButton);
        

        let alerttext = document.createElement("div");
        alerttext.innerHTML=message;

        alertmessage.appendChild(alerttext);

    document.querySelector(".alertbox").appendChild(alertmessage);

    cancelButton.addEventListener("click", () => {
        alertmessage.remove();
      });

    setTimeout(() => {
        alertmessage.remove();
    },5000)
}

