const { neon, neonConfig } = require('@neondatabase/serverless') // module js
const { drizzle} = require('drizzle-orm/neon-http')
const AWS = require('aws-sdk');
const secrets = require('../lib/secrets')

async function getDbClient() {
    const dburl = await secrets.getDatabaseUrl()      
    neonConfig.fetchConnectionCache = true;
    const sql =  neon(dburl)
    return sql
}

async function getDrizzleDBClient() {    
    const sql =  await getDbClient()
    return drizzle(sql)
}

module.exports.getDbClient = getDbClient;
module.exports.getDrizzleDBClient = getDrizzleDBClient;

