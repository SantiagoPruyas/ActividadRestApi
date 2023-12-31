import {pool} from './database.js';

class PersonaController{

    async getAll(req, res) {
        const [result] = await pool.query('SELECT * FROM personas');
        res.json(result);
    }

    async add(req,res){
        const persona = req.body;
        const [result] = await pool.query(`INSERT INTO Personas(nombre, apellido, dni) VALUES (?, ?, ?)`, [persona.nombre, persona.apellido, persona.dni]);
        res.json({"Id insertado": result.insertId})
    }

    async delete(req,res) {
        const persona = req.body;
        const [result] = await pool.query(`DELETE FROM Personas WHERE id=(?)`, [persona.id]);
        res.json({"Registros eliminados": result.affectedRows});
    }

    async update(req,res){
        const persona = req.body;
        const [result] = await pool.query(`UPDATE Personas SET nombre=(?), apellido=(?), dni=(?) WHERE id=(?)`, [persona.nombre, persona.apellido, persona.dni, persona.id]);
        res.json({"Registros actualizados": result.changedRows});
    }

}

class LibrosController{

    async getAll(req, res) {
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    }

    async getOne(req, res){
        try {
        const libro = req.body;
        const [result] = await pool.query(`SELECT * FROM libros WHERE id=(?)`, [libro.id]);
        if (result.length === 0){
            throw new Error('Libro sin datos.')
        } else {
            res.json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: 'Libro no encontrado o no cargado.' });
    }
    }

    async insertOne(req, res){
        try{
        const libro = req.body;
        const [result] = await pool.query(`INSERT INTO libros(nombre, autor, categoria, añoPublicacion, ISBN) VALUES (?, ?, ?, ?, ?)`, [libro.nombre, libro.autor, libro.categoria, libro.añoPublicacion, libro.ISBN]);
        if (result.length === 0){
            throw new Error('No se pudo insertar.')
        } else {
            res.json({"Libro insertado con ID: ": result.insertId})
        }
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: 'Los datos ingresados no corresponden a un libro.' });
    }
    }

    async updateOne(req, res){
        try {
            const libro = req.body;
            const [result] = await pool.query(`UPDATE libros SET nombre=(?), autor=(?), categoria=(?), añoPublicacion=(?), ISBN=(?) WHERE id=(?)`, [libro.nombre, libro.autor, libro.categoria, libro.añoPublicacion, libro.ISBN, libro.id]);
            if (result.length === 0){
                throw new Error('Libro no encontrado.')
            } else {
                res.json({"Registros actualizados": result.changedRows});
            }
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: 'ID inexistente.' });
        }
        
    }

    async deleteOne(req, res) {
        try{
        const libro = req.body;
        const [result] = await pool.query(`DELETE FROM libros WHERE ISBN=(?)`, [libro.ISBN]);   
        if (result.length === 0){
            throw new Error('Libro no encontrado.')
        } else {
            res.json({"Registros eliminados": result.affectedRows});
        }
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: 'ID inexistente.' });
    }
    }

}

export const persona = new PersonaController();
export const libro = new LibrosController();