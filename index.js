const express = require('express');

const app = express();
const axios = require('axios').default;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//MAPEAMENTO DA PASTA PUBLIC
app.use(express.static('public'));

//CONFIGURA O EJS COMO VIEW ENGINE (REDENRIZA AS PÁGINAS DE FRONT-END)
app.set('view engine', 'ejs');


//ROTA DE CADASTRO DE CATEGORIAS
app.get('/cadastroNoticia', (req, res)=>{
    res.render('Noticia/index');
});

//ROTA DE LISTAGEM DE CATEGORIAS
app.get('/listagemNoticia', (req, res)=>{
    
    const urlListagemNoticia = 'http://localhost:3000/listarNoticia';

    /*
    CHAMADA PELO AXIOS:
    1 - URL DA ROTA (urlListagemCategoria)
    2 - CALLBACK DA RESPOSTA DA CHAMADA
    */
    axios.get(urlListagemNoticia)
        .then(
            (response)=>{
                // console.log(response.data);
                // res.send(response.data);
                let noticias = response.data;
                res.render('categoria/listagemNoticia', {noticias});
                        
        }); 
    });

    //ROTA DE LISTAGEM DE EDIÇÃO
    app.get('/formEdicaoNoticia/:id', (req, res)=>{
        
        //RECEBE O ID DE CATEGORIA QUE VAI SER EDITADO
        let {id} = req.params;
        // console.log(id);

        //CHAMADA DO AXIOS PARA A API:
        const urlListagemNoticia = `http://localhost:3000/listarNoticia/${id}`;
        
        axios.get(urlListagemNoticia)
        .then(
            (response)=>{

                let noticia = response.data;
                res.render('categoria/editarNoticia', {noticia});

            }
        )
    });

    //ROTA DE EDIÇÃO
    app.post('/alterarNoticia', (req, res)=>{

        const urlAlterarNoticia = 'http://localhost:3000/alterarNoticia';
        console.log(req.body);

        axios.put(urlAlterarNoticia, req.body)
        .then(
            res.send('ALTERADO!')
        )

    });

app.listen(3001, ()=>{
    console.log('SERVIDOR RODANDO EM: http://localhost:3001');
});