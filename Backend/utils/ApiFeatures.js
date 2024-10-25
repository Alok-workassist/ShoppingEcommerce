class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query,
            this.queryStr = queryStr
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i"
            }
        } : {}

        this.query = this.query.find({ ...keyword });
        return this;
    }
    filter() {
        const queryCopy = { ...this.queryStr };

        const removeFields = ["keyword", "limit", "page"];

        // console.log(queryCopy);
        removeFields.forEach(key => {
            delete queryCopy[key];

        });
        // console.log(queryCopy);
        // Filter for price

        let queryStr = JSON.stringify(queryCopy);
        // console.log(queryStr);
        //in mongo db operator $ lga hota hai isliye we replacing


        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);
        // console.log(queryStr);


        this.query = this.query.find(JSON.parse(queryStr));
        // The parse step typically involves converting a JSON string back into a JavaScript object.
        return this;

    }
    pagination(resultperPage){
        const currentpage = Number(this.queryStr.page)??1;

        const skipPage = resultperPage * (currentpage - 1);

        this.query = this.query.limit(resultperPage).skip(skipPage);
        return this;

    }

}


module.exports = ApiFeatures