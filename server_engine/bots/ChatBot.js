import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

export const chatBot = async (req, res) => {
    try {
        const { prompt } = req.body
        
        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required." })
        }

        const companyInfo = `{
            name: "Reverion Tech",
            founded: "2023",
            services: [
              "AI Integration Solutions",
              "Custom Web Application Development",
              "Digital Transformation Consulting",
              "Cloud Migration Services",
              "Data Analytics & Business Intelligence"
            ],
            pricing: {
              consultation: "Free 15-minute initial consultation",
              hourlyRate: "$150-$250 depending on project complexity",
              projectBased: "Custom quotes available for larger projects"
            },
            team: {
              size: "15+ specialists",
              expertise: "AI engineers, full-stack developers, UX designers, and project managers"
            },
            contactInfo: {
              email: "connect@reveriontech.com",
              scheduling: "https://calendly.com/reveriontech",
              hours: "Monday-Friday, 9am-6pm EST",
              response: "24-hour response guarantee for all inquiries"
            },
            faq: [
              {
                question: "How long does a typical project take?",
                answer: "Project timelines vary based on scope and complexity. Small projects typically take 2-4 weeks, while larger enterprise solutions may take 3-6 months."
              },
              {
                question: "Do you offer maintenance after project completion?",
                answer: "Yes, we offer ongoing maintenance packages for all completed projects, including regular updates, bug fixes, and performance monitoring."
              },
              {
                question: "What technologies do you specialize in?",
                answer: "We specialize in modern web technologies including React, Node.js, Python, and various AI frameworks. Our team is experienced with AWS, Azure, and Google Cloud platforms."
              },
              {
                question: "How do you handle data security?",
                answer: "We implement industry-standard security practices including encryption, secure authentication, and regular security audits. All client data is handled according to applicable data protection regulations."
              }
            ]
          }`

        const newPrompt = `You are an AI Assistant for ${companyInfo}. Be helpful, professional, and direct. If you can't answer a specific technical question, offer to connect the user with a ${companyInfo}. Include the following information when appropriate for this users prompt '${prompt}'.`

        const response = await axios.post(
        "https://api.anthropic.com/v1/messages",
        {
            model: "claude-3-opus-20240229",
            max_tokens: 500,
            temperature: 0.7,
            stream: false,
            messages: [{ role: "user", content: newPrompt }], 
        },
        {
            headers: {
            "x-api-key": process.env.ANTHROPIC_API_KEY, 
            "Content-Type": "application/json",
            "Accept": "application/json",
            "anthropic-version": "2023-06-01",
            },
        }
        )

        if (response.data?.content) {
            return res.status(200).json({ message: response.data.content })
        } else {
            return res.status(500).json({ error: "No response from AI." })
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal server error." })
    }
}