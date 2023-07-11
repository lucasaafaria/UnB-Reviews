import mysql from 'mysql2/promise';
 
declare type QueryHandlerProps = {
  query: string;
  values?: any[];
}

export async function queryHandler({ query, values = [] }: QueryHandlerProps) {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'UnB Reviews',
  });

  const [results] = await connection.query(query, values);
  connection.end();

  return results;
}