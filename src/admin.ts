import AdminBro from 'admin-bro'
import { createConnection } from 'typeorm';
import AdminBroTypeorm = require('@admin-bro/typeorm')
import AdminBroExpress from '@admin-bro/express'
import {User} from "./entities/User"
import {Router} from "express"


export default async (rootPath: string = '/admin') => {
    
    const con = await createConnection();
    
    AdminBro.registerAdapter(AdminBroTypeorm)
    const adminBro = new AdminBro({
        // resources: [User],
        databases: [con],
        rootPath,
    })
    
    const router = AdminBroExpress.buildRouter(adminBro)
    console.log("Setting up the admin interface...")
    return router
}