/*
  Configura o multer para suportar envio de arquivos
  Salva a imagem em uma pasta local no servidor e armazena na tabela
  o nome da imagem.
  O multer permite estabelecer uma pasta para o arquivo e buscar através do nome
*/

import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
