const { sql } = require("@vercel/postgres");
const { NextResponse } = require("next/server");

async function rollbackData() {
    try {
        await sql`DROP TABLE kitchenApp_meals`;
        return NextResponse.json({ message: "Drop table kitchenApp_meals succeeded!" }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 });
    }

};
rollbackData();
