import express from 'express';
import { shortenPostRequestBodySchema } from '../validations/request.validation.js';
import { nanoid } from 'nanoid';
import { db } from '../db/db_index.js';
import { and, eq } from 'drizzle-orm';
import { urlsTable, usersTable } from '../models/index.js';
import { ensureAuthenticated } from '../middlewares/auth.middleware.js';
import { createShortUrl } from '../services/url.service.js';


const router = express.Router();

router.post('/shorten', ensureAuthenticated, async(req, res) => {

const validationResult = await shortenPostRequestBodySchema.safeParseAsync(
    req.body
);

if(validationResult.error) {
    return res.
    status(400)
    .json({ error: validationResult.error});
}

const { url, code } = validationResult.data;
const shortCode = code ?? nanoid(6);

const result =  await createShortUrl({
    shortCode,
    url,
    userId: req.user.id,
});

return res
.status(201)
.json({ 
    id: result.id, 
    shortCode: result.shortCode, 
    targetURL: result.targetURL 
});

});

router.get('/codes', ensureAuthenticated, async function(req, res) {
    const codes = await db
    .select()
    .from(urlsTable)
    .where(eq (urlsTable.userId, req.user.id));

    return res.json({ codes });
});

router.put('/:id', ensureAuthenticated, async (req, res) => {
    const { id } = req.params;

    // validate body with same schema used for POST
    const validationResult = await shortenPostRequestBodySchema.safeParseAsync(req.body);

    if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error });
    }

    const { url, code } = validationResult.data;

    try {
        // Check: record belongs to logged-in user
        const [existing] = await db
            .select()
            .from(urlsTable)
            .where(and(eq(urlsTable.id, id), eq(urlsTable.userId, req.user.id)));

        if (!existing) {
            return res.status(404).json({ error: "URL not found or unauthorized" });
        }

        // Check if shortCode already exists for another record
        if (code) {
            const [duplicate] = await db
                .select()
                .from(urlsTable)
                .where(and(eq(urlsTable.shortCode, code), eq(urlsTable.userId, req.user.id)));

            if (duplicate && duplicate.id !== id) {
                return res.status(400).json({ error: "Short code already in use" });
            }
        }

        // Perform update
        const [updated] = await db
            .update(urlsTable)
            .set({
                shortCode: code ?? existing.shortCode,
                targetURL: url ?? existing.targetURL,
                updatedAt: new Date()
            })
            .where(and(eq(urlsTable.id, id), eq(urlsTable.userId, req.user.id)))
            .returning({
                id: urlsTable.id,
                shortCode: urlsTable.shortCode,
                targetURL: urlsTable.targetURL
            });

        return res.status(200).json({
            message: "URL updated successfully",
            updated
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


router.delete('/:id', ensureAuthenticated, async function(req, res) {
    const id = req.params.id;
    await db 
        .delete(urlsTable)
        .where(and(eq(urlsTable.id, id), eq(urlsTable.userId, req.user.id )));

    return res.status(200).json({ deleted: true });
});

router.get('/:shortCode', async function(req, res) {
    const code = req.params.shortCode;

    const [result] = await db
    .select({
        targetURL: urlsTable.targetURL
    })
    .from(urlsTable)
    .where(eq(urlsTable.shortCode, code));

    if(!result) {
        return res.status(404).json({ error: ' Invalid URL' });
    }

    return res.redirect(result.targetURL);
});


export default router;