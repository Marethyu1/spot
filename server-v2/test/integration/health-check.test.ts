import request from 'supertest'
import server from "../../src/server"

describe('The health check route', function () {
    it('Should return successfully', async function () {
        const res = await request(server)
            .get("/health");

        expect(res.status).toBe(200)
    })
});
