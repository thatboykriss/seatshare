import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react"

export function AuthPage({ onBack }: { onBack?: () => void }) {
  const [loading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex bg-[#0B0F14] text-white">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center p-12">
        <div className="absolute inset-0 bg-[url('/city-night.jpg')] bg-cover bg-center opacity-30" />

        <div className="relative z-10 max-w-lg">
          <h1 className="text-5xl font-bold leading-tight">
            The modern way to{" "}
            <span className="text-[#C8A96A]">commute</span> across cities
          </h1>

          <p className="mt-6 text-gray-300">
            SeatShare helps you book rides, share trips, and travel smarter —
            all in one seamless platform.
          </p>

          <div className="mt-10 flex gap-8 text-sm text-gray-400">
            <div>
              <p className="text-2xl font-semibold text-white">50K+</p>
              Active Users
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">200K+</p>
              Rides Shared
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">4.9★</p>
              Rating
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6">
        <Card className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 shadow-xl rounded-2xl">
          <CardContent className="p-6">

            <Tabs defaultValue="signin" className="w-full">

              <TabsList className="grid grid-cols-2 mb-6 bg-white/10 rounded-lg">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* SIGN IN */}
              <TabsContent value="signin">
                <div className="space-y-4">

                  {/* Email */}
                  <div>
                    <label className="text-sm text-gray-400">Email</label>
                    <div className="flex items-center mt-1 bg-white/10 rounded-md px-3 focus-within:ring-1 focus-within:ring-[#C8A96A]">
                      <Mail size={16} className="text-gray-400" />
                      <Input
                        placeholder="you@example.com"
                        className="bg-transparent border-none focus-visible:ring-0"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="text-sm text-gray-400">Password</label>
                    <div className="flex items-center mt-1 bg-white/10 rounded-md px-3 focus-within:ring-1 focus-within:ring-[#C8A96A]">
                      <Lock size={16} className="text-gray-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="bg-transparent border-none focus-visible:ring-0"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Remember + Forgot */}
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="accent-[#C8A96A]" />
                      Remember me
                    </label>
                    <button className="hover:text-[#C8A96A] transition">
                      Forgot password?
                    </button>
                  </div>

                  {/* Button */}
                  <Button
                    className="w-full bg-[#C8A96A] hover:bg-[#b89655] text-black font-semibold transition-all duration-300"
                    disabled={loading}
                  >
                    Sign In
                  </Button>
                  

                  {/* Divider */}
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <div className="flex-1 h-px bg-white/10" />
                    OR
                    <div className="flex-1 h-px bg-white/10" />
                  </div>

                  {/* Socials */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10">
                      Google
                    </Button>
                    <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10">
                      Apple
                    </Button>
                  </div>

                  <Button
  onClick={onBack}
  variant="ghost"
  className="w-full bg-[#C8A96A] hover:bg-[#b89655] text-black font-semibold transition-all duration-300"
>
  ← Back to Home
</Button>
                </div>
              </TabsContent>

              {/* SIGN UP */}
              <TabsContent value="signup">
                <div className="space-y-4">

                  {/* Name */}
                  <div>
                    <label className="text-sm text-gray-400">Full Name</label>
                    <div className="flex items-center mt-1 bg-white/10 rounded-md px-3 focus-within:ring-1 focus-within:ring-[#C8A96A]">
                      <User size={16} className="text-gray-400" />
                      <Input
                        placeholder="John Doe"
                        className="bg-transparent border-none focus-visible:ring-0"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-sm text-gray-400">Email</label>
                    <div className="flex items-center mt-1 bg-white/10 rounded-md px-3 focus-within:ring-1 focus-within:ring-[#C8A96A]">
                      <Mail size={16} className="text-gray-400" />
                      <Input
                        placeholder="you@example.com"
                        className="bg-transparent border-none focus-visible:ring-0"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="text-sm text-gray-400">Password</label>
                    <div className="flex items-center mt-1 bg-white/10 rounded-md px-3 focus-within:ring-1 focus-within:ring-[#C8A96A]">
                      <Lock size={16} className="text-gray-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="bg-transparent border-none focus-visible:ring-0"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-[#C8A96A] hover:bg-[#b89655] text-black font-semibold transition-all duration-300"
                    disabled={loading}
                  >
                    Create Account
                  </Button>
                  <Button
  onClick={onBack}
  variant="ghost"
  className="w-full bg-[#C8A96A] hover:bg-[#b89655] text-black font-semibold transition-all duration-300"
>
  ← Back to Home
</Button>
                </div>
              </TabsContent>

            </Tabs>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}