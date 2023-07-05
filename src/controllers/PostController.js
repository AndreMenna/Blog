const db = require('../database/dbconnection');

class PostController {
    constructor() {
        console.log('Cheguei no Post controller');
    }

    renderAdd(req, res) {
        return res.render('post-insert');
    }

    renderEdit(req, res) {
             const { id } = req.params;             
             db.get('SELECT * FROM DBlog WHERE DBlog.id = ?', [id], (err, post) => {
                  db.all('SELECT * FROM images', (err, imgs) => {
                    if (err) {
                        console.error(err);
                    } else {
                            imgs.forEach(img => {
                                if(post.id == img.publicacao_id){
                                    post.url = img.url;
                                }
                            });
                        return res.render('post-edit', { post });
                    }
                });
             });
    }

    create(req, res) {
        const { title, description, author, url } = req.body;
        const now = new Date().getTime();
        const sql = 'INSERT INTO DBlog (title, description, author, created_at) VALUES (?, ?, ?, ?)';
        const sqlImage = 'INSERT INTO images (url, publicacao_id) VALUES (?, ?)';
        let publicacao;
        const params = [
            title, description, author, now
        ];  
    
        db.run(sql,  params, (err) => {
            if (err) {
                console.log(err)
                return res.status(500).send(err);
            }
            db.get('SELECT * FROM DBlog WHERE DBlog.created_at = ?', [now], (err, post) => {
               publicacao = post.id;

               const paramsImages = [
                url, publicacao
                ];
                console.log({paramsImages});
    
                db.run(sqlImage,  paramsImages, (err) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send(err);
                    }
                });
           });
            return res.redirect('/');
        });        
    }   
    
    update(req, res) {

        const { title, description, author, id, url } = req.body;
        
        const sql = 'UPDATE DBlog SET title = ?, description = ?, author = ? WHERE id = ?';
        const sqlImage = 'UPDATE images SET url = ? WHERE publicacao_id = ?';
        
        const params = [
            title, description, author, id
        ];
        const paramsImage = [
            url, id
        ];

        db.run(sql,  params, (err) => {
            if (err) {
                console.log(err)
                return res.status(500).send(err);
            }
            console.log('Post Atualizado!');
        })        
        
        db.run(sqlImage,  paramsImage, (err) => {
            if (err) {
                console.log(err)
                return res.status(500).send(err);
            }         
        })
        return res.redirect('/');
    }   

    list(req, res) {
        var DBlog;
        var images;
        db.all('SELECT * FROM DBlog ORDER BY created_at DESC', (err, rows) => {
            if (err) {
                console.error(err);
            } else {
                console.log({ rows });
                DBlog = rows;

                db.all('SELECT * FROM images', (err, imgs) => {
                    if (err) {
                        console.error(err);
                    } else {
                        DBlog.forEach(element => {
                            
                            imgs.forEach(img => {
                                if(element.id == img.publicacao_id){
                                    element.url = img.url;
                                }
                            });
                        });

                        res.render('home', { posts: DBlog });
                    }
                });
            }
        });
    }

    delete(req, res) {
        const { id } = req.params;
        const sql = 'DELETE FROM DBlog WHERE DBlog.id = ?';
        db.run(sql, [id], (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Problema ao excluir!");
            }
            return res.redirect('/');
        })
    }

    detail(req, res) {  
        const { id } = req.params;
        db.get('SELECT * FROM DBlog WHERE DBlog.id = ?', [id], (err, post) => {
             db.all('SELECT * FROM images', (err, imgs) => {
                if (err) {
                    console.error(err);
                } else {
                        imgs.forEach(img => {
                            if(post.id == img.publicacao_id){
                                post.url = img.url;
                            }
                        });
                        return res.render('post-detail', { post });
                    }
                });
        });
    }
}

module.exports = PostController;