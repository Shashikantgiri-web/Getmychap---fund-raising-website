import React from 'react'
import { signIn } from "next-auth/react"
import { useState } from "react"

const signin = () => {
  const [email, setEmail] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signIn("email", { email })
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Sign in with Email</button>
      </form>
    </div>
  )
}

export default signin  