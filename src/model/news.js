class News {
  constructor(data) {
    this.uuid = data["uuid"]
    this.title = data["title"]
    this.content = data["content"]
    this.createdAt = data["createdAt"] 
      ? new Date(data["createdAt"]) 
      : new Date()
    this.updatedAt = data["updatedAt"] 
      ? new Date(data["updatedAt"]) 
      : new Date()
  }
  json() {
    return {
      "uuid": this.uuid,
      "title": this.title,
      "content": this.content,
      "createdAt": this.createdAt.toISOString(),
      "updatedAt": this.updatedAt.toISOString()
    }
  }
}

module.exports = News