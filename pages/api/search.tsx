import {NextApiRequest, NextApiResponse} from "next";
import {SearchData} from "../../lib/search/types";
import database from "../../lib/search/database.json";

interface ApiSearchRequest extends NextApiRequest {
    body: { searchTerm?: string };
}

export type ApiSearchResponse = SearchData[];

export default function handler(req: ApiSearchRequest, res: NextApiResponse<ApiSearchResponse>) {
    const {
        body: {searchTerm},
    } = req;

    if (req.method === 'POST' && searchTerm && searchTerm.length > 0) {
        // case-insensitive match for the search term
        const searchPattern = new RegExp(searchTerm, 'i');

        const filteredResults = database.filter((result) => {
            return (
                // either the title or the text contains the search term
                searchPattern.test(result.title || result.text)
            );
        });
        res.status(200).json(filteredResults);
    } else {
        res.status(200).json([]);
    }
}