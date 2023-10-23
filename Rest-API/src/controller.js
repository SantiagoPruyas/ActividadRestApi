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

    async getOne(req,res){
        const libro = req.body;
        const [result] = await pool.query(`SELECT * FROM Libros WHERE id=(?)`, [libro.id]);
        res.json(result);
    }

    async insertOne(req,res){
        try{
        const persona = req.body;
        const [result] = await pool.query(`INSERT INTO Libros(nombre, autor, categoria, fecha, ISBN) VALUES (?, ?, ?, ?, ?)`, [libro.nombre, libro.autor, libro.categoria, libro.año-publicacion, libro.ISBN]);
        if (result.length === 0){
            throw new Error('No se pudo insertar.')
        } else {
            res.json({"Libro insertado con ID: ": result.insertId})
        }
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: 'Los datos ingresados sobrepasan los caracteres permitidos.' });
    }
    }

    async updateOne(req,res){
        try {
            const persona = req.body;
            const [result] = await pool.query(`UPDATE Libros SET nombre=(?), autor=(?), categoria=(?), fecha=(?), ISBN=(?) WHERE id=(?)`, [libro.nombre, libro.autor, libro.categoria, libro.año-publicacion, libro.ISBN, libro.id]);
            if (result.length === 0){
                throw new Error('Libro no encontrado.')
            } else {
                res.json({"Registros actualizados": result.changedRows});
            }
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: 'id inexistente.' });
        }
        
    }

    async deleteOne(req,res) {
        const persona = req.body;
        const [result] = await pool.query(`DELETE FROM Libros WHERE ISBN=(?)`, [libro.ISBN]);
        res.json({"Registros eliminados": result.affectedRows});
    }

}

export const persona = new PersonaController();
export const libro = new LibrosController();