window.addEventListener('load', () => {

    let newDate;
    let pressedTime;
    let stringArray = [];
    let ul = document.getElementById('list');
    

    window.addEventListener('keyup', (e) => {

        pressedTime = new Date().getTime();

        if(e.key != 'Backspace' && e.key != 'Escape' && e.key != 'F5'){

            stringArray.push(e.key);

        }

        if(e.key == 'Backspace'){

            stringArray.pop();
    
        }else if(e.key == "Escape"){
    
            stringArray = [];
    
        }

        let toString;

        if(stringArray.length >= 5){

            toString = stringArray.reduce( (total, num) => {

                return total + num;
                
            });

        }

        let checkingInterval = window.setInterval( () => {

            newDate = new Date().getTime();

            if(newDate - pressedTime >= 5000){

                clearInterval(checkingInterval);
                stringArray = [];

            }
    
        }, 1);

        if(toString === 'injects3crets'){

            clearInterval(checkingInterval);

            getUsers('https://api.github.com/repos/elixir-lang/elixir/issues');

            stringArray = [];

        }

    });


    const getUsers = (url) => {

        axios.get(url)
                .then( (res) => {

                    let response = res.data;
                    let modifiedResponse = response.slice(0,5);

                    modifiedResponse.forEach( (item) => {

                            ul.innerHTML += `<li>
                                                <div class="title">
                                                    <h3>Issues Name:</h3><p>${item.title}</p>
                                                </div>
                                                <div class="author">
                                                    <h3>Nickname:</h3><p>${item.user.login}</p>
                                                </div>
                                            </li>`;

                    });

                    window.setTimeout( () => {

                        ul.style.display = 'none';
                        ul.innerHTML = "";
        
                    },15000);
                

                })
                .catch( (err) => {

                    console.log(err);

                });
    
    }   

});