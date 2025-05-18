import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }
        try {
            await axios.post('https://your-api.com/register', { email, password })
            navigate('/login')
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed')
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-white">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h1>
                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    {error && <div className="text-red-600 text-center">{error}</div>}
                    <button
                        type="submit"
                        className="cursor-pointer w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Register
                    </button>
                    <div className="text-center mt-4">
                        <span className="text-gray-600">Already have an account? </span>
                        <Link
                            to="/login"
                            className="text-blue-600 hover:underline font-semibold"
                        >
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register