$.ajax({

    url: './checkfiles.php',
    success: (res) => {
        
        if(res == 'yes'){
            
            $.ajax({

                url: './pan_tadeusz.txt',
                success: (res) => {
            
                    let responedText = res;
                    let replaceBreakLines = responedText.replace(/\n/g, " ");
                    let clearSpecialSigns = replaceBreakLines.replace(/[.,;!-?()_<>»…«—]/g, "");
                    let separateWithCommas = clearSpecialSigns.split(" ");
                    
                    let deleteWhiteSpaces= separateWithCommas.filter( (word) => {
            
                        return word != "";
            
                    });
            
                    let arrayWithSeperatedWord = [...new Set(Array.from(deleteWhiteSpaces))];
            
                    let initAnArray = Array.from(arrayWithSeperatedWord);
                    let dataToSend = JSON.stringify(initAnArray);
            
                    //transfer data to word_list.txt through PHP
                    
                    $.ajax({
            
                        type: "POST",
                        url: './saveToWordList.php',
                        data: {words: dataToSend},
                        success: (res) => {
                            console.log(res);
                        }
            
                    });
            
                    //create hashes array
            
                    let hashArray = [];
            
                    initAnArray.forEach( (word) => {
            
                        hashArray.push(md5(word));
            
                    });
            
                    //maping words array and hashes array into new array which returns array of objects
            
                    let ArraysMap = initAnArray.map( (word, index) => {
            
                        return { word: word, hash: hashArray[index]};
            
                    });
            
                    //send array to PHP file in case of pushing rows into the .txt file
            
                    let sendMappedArray = JSON.stringify(ArraysMap);
            
                    $.ajax({
            
                        type: 'POST',
                        url: './saveToWordsWithHashes.php',
                        data: {hashes: sendMappedArray},
                        success: (res) => {
                            console.log(res);
                        }
            
                    });
            
                    //this console.log returns mapped array consisted of words and matched hashes
            
                    //console.log(ArraysMap);
            
                    //looking for right hash
            
                    let userHash = "c8e095e2a26f8540afabb36dcdaee3b1";
            
                    //function which returns right password
            
                    let check = ArraysMap.find( (word) => {
            
                        if(word.hash == userHash){
            
                            return word;
            
                        }
            
                    });
            
                    //right password is placed in console.log
            
                    //console.log(check);
                    document.body.innerHTML = `<h1>Word: ${check.word}, Hash: ${check.hash}`;
            
                }
            
            });

        }else{

            alert("Words have been saved!");

        }

    }

});