'use client'

import type React from 'react'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const { login } = useAuth()
	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')

		try {
			const result = await login(email, password)

			if (result.success) {
				router.push('/dashboard')
			} else {
				setError(result.error || 'An error occurred while logging in. Please try again.')
			}
		} catch (e) {
			console.error(e)
			setError('An error occurred while logging in. Please try again.')
		}
	}

	return (
		<div className="flex min-h-screen items-center justify-center px-4 py-12">
			<Card className="w-full max-w-md">
				<form onSubmit={handleSubmit}>
					<CardHeader className="mb-4">
						<CardTitle className="text-2xl font-bold">Login</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4 mb-6">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						{error && <p className="text-sm text-red-500">{error}</p>}
					</CardContent>
					<CardFooter className="flex flex-col space-y-4">
						<Button className="w-full" type="submit">
							Login
						</Button>
						<div className="text-center text-sm">
							Don&apos;t have an account?{' '}
							<Link className="underline underline-offset-4 hover:text-primary" href="/signup">
								Sign up
							</Link>
						</div>
					</CardFooter>
				</form>
			</Card>
		</div>
	)
}
