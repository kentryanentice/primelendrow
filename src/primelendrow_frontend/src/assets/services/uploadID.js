export const uploadID = async (file) => {
    const formData = new FormData()
    formData.append("file", file)
  
    try {
        const response = await fetch("http://localhost:4943/api/v2/canister/primelendrow_assets/store", {
            method: "POST",
            body: formData
        })

        if (!response.ok) {
            throw new Error("Failed to upload image")
        }

        const data = await response.json()
        return `https://${process.env.CANISTER_ID}.ic0.app/${data.filename}`
    } catch (error) {
        console.error("Image upload error:", error)
        return null
    }
}