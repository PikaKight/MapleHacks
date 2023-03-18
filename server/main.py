from fastapi import FastAPI, Request

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/calc")
async def calc(req: Request):

    reqBody = await req.json()
    print(reqBody)

    return {"message": "Done"}