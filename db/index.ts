import {Pool} from "pg";
import cfg  from '../config.json'

const pool = new Pool(cfg.dbConnection)
export default pool;