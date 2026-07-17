import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { login, setAuthData, getAuthToken } from "../api"
import {AuthCard, PageShell, PrimaryButton, SectionHeader, TextInput} from "../components"

const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  if (getAuthToken()) return <Navigate to="/" />

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!email || !password) {
      setError("Email and password are required")
      return
    }

    setError("")
    setLoading(true)

    try {
      const response = await login(email, password)
      const success = response?.data?.success

      if (success) {
        const { token, user } = response.data.data
        setAuthData(token, user)
        navigate("/")
      } else {
        setError(response?.data?.message || "Invalid email or password")
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Invalid email or password"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageShell>
      <AuthCard>
        <SectionHeader
          icon={<span>🍽️</span>}
          title="Party Menu"
          subtitle="Sign in to explore our delicious menu"
        />

        {error && (
          <div className="mt-6 rounded-3xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <TextInput
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="admin@example.com"
          />

          <TextInput
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="********"
          />

          <PrimaryButton type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </PrimaryButton>
        </form>
      </AuthCard>
    </PageShell>
  )
}

export default SignIn