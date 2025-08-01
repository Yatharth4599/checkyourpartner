"use client";

import { useState } from "react";
import ModalForm from "./ModalForm";
import Link from "next/link";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="font-sans bg-gray-50 text-gray-900 min-h-screen flex flex-col relative">
      <ModalForm open={modalOpen} onClose={() => setModalOpen(false)} />
      {/* Hero Section with Animated Background */}
      <section className="relative w-full min-h-[70vh] flex flex-col justify-center items-center text-center px-4 py-16 sm:py-24 overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 animate-gradient-shift"></div>
        
        {/* Animated Radar/Sonar Rings */}
        <div className="absolute inset-0 flex items-center justify-center -z-5">
          {/* Inner Ring - Pink */}
          <div className="animate-radar-pulse rounded-full border-4 border-pink-500 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px]"></div>
          <div className="absolute animate-radar-pulse-delayed rounded-full border-4 border-pink-400 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px]"></div>
          
          {/* Middle Ring - Purple */}
          <div className="absolute animate-radar-pulse-delayed-2 rounded-full border-4 border-purple-500 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px]"></div>
          <div className="absolute animate-radar-pulse-delayed-3 rounded-full border-4 border-purple-400 w-[400px] h-[400px] sm:w-[550px] sm:h-[550px]"></div>
          
          {/* Outer Ring - Blue */}
          <div className="absolute animate-radar-pulse-delayed-4 rounded-full border-4 border-blue-500 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px]"></div>
          <div className="absolute animate-radar-pulse-delayed-5 rounded-full border-4 border-blue-400 w-[550px] h-[550px] sm:w-[750px] sm:h-[750px]"></div>
          
          {/* Radar Center Point */}
          <div className="absolute w-6 h-6 bg-pink-600 rounded-full shadow-lg animate-pulse"></div>
          <div className="absolute w-3 h-3 bg-white rounded-full"></div>
          
          {/* Radar Sweep Line */}
          <div className="absolute w-2 h-[400px] sm:h-[600px] bg-gradient-to-b from-transparent via-pink-500 to-transparent animate-radar-sweep origin-bottom"></div>
        </div>
        
        {/* Floating Particles */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-10 animate-float-slow w-2 h-2 bg-pink-400 rounded-full opacity-60"></div>
          <div className="absolute right-1/4 top-24 animate-float-medium w-3 h-3 bg-purple-400 rounded-full opacity-50"></div>
          <div className="absolute left-1/3 bottom-16 animate-float-fast w-1 h-1 bg-blue-400 rounded-full opacity-70"></div>
          <div className="absolute right-1/3 bottom-8 animate-float-slow w-2 h-2 bg-pink-300 rounded-full opacity-60"></div>
          <div className="absolute left-1/2 top-1/2 animate-float-medium w-2 h-2 bg-purple-300 rounded-full opacity-50"></div>
          <div className="absolute right-1/2 top-1/3 animate-float-fast w-1 h-1 bg-blue-300 rounded-full opacity-70"></div>
          <div className="absolute left-1/6 top-1/2 animate-float-slow w-3 h-3 bg-pink-500 rounded-full opacity-40"></div>
          <div className="absolute right-1/6 bottom-1/3 animate-float-medium w-2 h-2 bg-purple-500 rounded-full opacity-50"></div>
        </div>
        
        {/* Animated Floating Hearts */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <span className="absolute left-1/4 top-10 animate-heart-float text-pink-400 text-4xl drop-shadow-lg">♥</span>
          <span className="absolute right-1/4 top-24 animate-heart-float2 text-pink-300 text-2xl drop-shadow-lg">♥</span>
          <span className="absolute left-1/3 bottom-16 animate-heart-float3 text-pink-500 text-3xl drop-shadow-lg">♥</span>
          <span className="absolute right-1/3 bottom-8 animate-heart-float text-pink-400 text-2xl drop-shadow-lg">♥</span>
          <span className="absolute left-1/2 top-1/2 animate-heart-float2 text-pink-300 text-5xl drop-shadow-lg">♥</span>
          <span className="absolute right-1/2 top-1/3 animate-heart-float3 text-purple-400 text-3xl drop-shadow-lg">♥</span>
          <span className="absolute left-1/6 bottom-1/4 animate-heart-float text-blue-400 text-2xl drop-shadow-lg">♥</span>
        </div>
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 -z-20 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-grid-move"></div>
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-fuchsia-600 to-blue-600 drop-shadow-lg">
            <span className="block text-4xl sm:text-6xl font-black tracking-tight mb-2">checkyourpartner.com</span>
            <span className="block text-lg sm:text-2xl font-semibold text-gray-800 mt-2">Test Their Loyalty Before You Waste Your Time</span>
          </h1>
          <p className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 drop-shadow">&quot;We test your partner&apos;s loyalty — so your heart doesn&apos;t get broken.&quot;</p>
          <ul className="flex flex-col sm:flex-row gap-2 justify-center items-center text-pink-600 text-lg mb-8">
            <li className="flex items-center gap-2"><span>✅</span> Get proof.</li>
            <li className="flex items-center gap-2"><span>✅</span> Real Human tests (Not AI 😉)</li>
            <li className="flex items-center gap-2"><span>✅</span> No regrets.</li>
          </ul>
          <button onClick={() => setModalOpen(true)} className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-all">Start Loyalty Test — Only $69 <span className="text-xs font-normal">(Limited Launch Offer)</span></button>
        </div>
      </section>

      {/* Section 2: The Hook */}
      <section className="max-w-2xl mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ever had a gut feeling something&apos;s off?</h2>
        <p className="text-lg mb-2">We test that for you.</p>
        <p className="text-gray-700">Whether you&apos;re in a long-distance relationship, suspicious about someone you met online, or just need peace of mind — we offer a full-fledged Loyalty Test powered by real conversations, social analysis, and cold hard evidence.</p>
      </section>

      {/* Section 3: How It Works */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Loyalty Testing in 3 Bold Steps</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="bg-pink-50 rounded-xl p-6 flex flex-col items-center shadow">
              <span className="text-3xl mb-2">🔹</span>
              <h3 className="font-bold mb-2">Step 1: You give us details</h3>
              <p className="text-gray-700 text-center text-sm">Your partner&apos;s name, social media links, age group, and preferred type.</p>
            </div>
            <div className="bg-pink-50 rounded-xl p-6 flex flex-col items-center shadow">
              <span className="text-3xl mb-2">🔹</span>
              <h3 className="font-bold mb-2">Step 2: Our agents slide in</h3>
              <p className="text-gray-700 text-center text-sm">We use good-looking, verified influencers to message your partner discreetly and try to lure them in with charm.</p>
            </div>
            <div className="bg-pink-50 rounded-xl p-6 flex flex-col items-center shadow">
              <span className="text-3xl mb-2">🔹</span>
              <h3 className="font-bold mb-2">Step 3: We analyze behavior + social data</h3>
              <p className="text-gray-700 text-center text-sm">AI + human team rates response tone, interest, follow-ups. You get proof — chats, screenshots, and our exclusive Red Flag Score™.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Red Flag Score */}
      <section className="py-16 px-4 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">🔴 The Red Flag Score™</h2>
          <p className="text-xl text-gray-700 mb-8">Your partner gets a <span className="font-bold text-pink-600">0-100 score</span> based on their loyalty behavior</p>
          
          {/* Red Flag Score Display */}
          <div className="bg-white rounded-2xl p-8 shadow-xl mb-8 border-4 border-pink-200">
            <div className="text-6xl sm:text-8xl font-black mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-yellow-500 to-red-600">0-100</span>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-4">Red Flag Score™</div>
            
            {/* Score Meter */}
            <div className="w-full max-w-2xl mx-auto mb-6">
              <div className="flex justify-between text-sm font-semibold mb-2">
                <span className="text-green-600">0</span>
                <span className="text-yellow-600">50</span>
                <span className="text-red-600">100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-600 h-4 rounded-full"></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-green-600 font-bold">LOYAL</span>
                <span className="text-yellow-600 font-bold">SUSPICIOUS</span>
                <span className="text-red-600 font-bold">🚩🚩🚩</span>
              </div>
            </div>
          </div>
          
          {/* What We Check */}
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-pink-50 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-3 text-pink-700">📱 Response Analysis</h3>
              <ul className="text-left text-gray-700 space-y-2">
                <li>• Flirty reply patterns</li>
                <li>• Response speed & enthusiasm</li>
                <li>• Willingness to meet up</li>
                <li>• Personal info sharing</li>
              </ul>
            </div>
            <div className="bg-pink-50 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-3 text-pink-700">🔍 Social Media Check</h3>
              <ul className="text-left text-gray-700 space-y-2">
                <li>• Dating app presence</li>
                <li>• Bio contradictions</li>
                <li>• Recent activity patterns</li>
                <li>• Relationship status</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 text-lg text-gray-600">
            <span className="font-bold text-pink-600">Get your partner&apos;s exact score</span> — no more guessing games
          </div>
        </div>
      </section>

      {/* Section 5: Pricing */}
      <section id="pricing" className="py-12 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">🎯 Full Loyalty Test – Limited Launch Offer</h2>
          <div className="mb-4">
            <span className="text-2xl line-through text-gray-400 mr-2">$99</span>
            <span className="text-3xl font-extrabold text-pink-600">Now $69</span>
            <span className="ml-2 text-base text-green-600 font-semibold">✅</span>
          </div>
          <ul className="text-gray-700 mb-6 text-left inline-block text-base">
            <li>• Messaging by real profiles</li>
            <li>• Full report with Red Flag Score™</li>
            <li>• All screenshots + chat logs</li>
            <li>• Social media pattern analysis</li>
            <li>• 100% confidential service</li>
            <li>• Report delivered in 48–72 hours</li>
          </ul>
          <div>
            <button onClick={() => setModalOpen(true)} className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-all">Book a Test Now</button>
          </div>
        </div>
      </section>

      {/* Section 6: Why We’re Better */}
      <section className="py-12 px-4 bg-pink-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">🆚 Why We’re Better</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden text-center">
              <thead className="bg-pink-100">
                <tr>
                  <th className="py-2 px-4 font-bold">Feature</th>
                  <th className="py-2 px-4 font-bold">CheckMyPartner</th>
                  <th className="py-2 px-4 font-bold">Spy Apps</th>
                  <th className="py-2 px-4 font-bold">Private Investigator</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr>
                  <td className="py-2 px-4">Real flirt test</td>
                  <td>✅</td><td>❌</td><td>❌</td>
                </tr>
                <tr className="bg-pink-50">
                  <td className="py-2 px-4">AI + Human combo</td>
                  <td>✅</td><td>❌</td><td>❌</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Screenshots & proof included</td>
                  <td>✅</td><td>❌</td><td>✅</td>
                </tr>
                <tr className="bg-pink-50">
                  <td className="py-2 px-4">Confidential + Fast</td>
                  <td>✅</td><td>❌</td><td>❌</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Price</td>
                  <td>$69</td><td>$250+</td><td>$1500+</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 7: Testimonials */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">💌 Testimonials</h2>
          <div className="flex flex-col gap-8">
            <blockquote className="bg-pink-50 rounded-xl p-6 shadow text-left">
              <p className="text-lg font-medium mb-2">&quot;Caught my long-distance partner replying to a model in 10 minutes. Saved me from wasting another year. Thank you.&quot;</p>
              <footer className="text-sm text-gray-600">— Priya, 27, Mumbai</footer>
            </blockquote>
            <blockquote className="bg-pink-50 rounded-xl p-6 shadow text-left">
              <p className="text-lg font-medium mb-2">&quot;I just needed peace of mind. Turns out he passed with flying colors. Worth every rupee.&quot;</p>
              <footer className="text-sm text-gray-600">— Mehreen, 25, Dubai</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Section 8: Sticky Call to Action Banner */}
      <div id="cta" className="fixed bottom-0 left-0 w-full bg-pink-700 text-white py-4 px-4 flex flex-col sm:flex-row items-center justify-between z-50 shadow-lg">
        <div className="text-lg font-semibold mb-2 sm:mb-0">💔 Don&apos;t wait to find out the hard way. 🕵️ Test your partner&apos;s loyalty now — confidentially.</div>
        <button onClick={() => setModalOpen(true)} className="bg-white text-pink-700 font-bold py-2 px-6 rounded-full shadow hover:bg-pink-100 transition-all">Get Started – $69 Only</button>
      </div>

      {/* Footer */}
      <footer className="mt-auto py-8 px-4 bg-gray-900 text-gray-200 text-center text-sm flex flex-col gap-2 pb-20">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-2">
          <a href="#contact" className="hover:underline">Contact Us</a>
          <Link href="/terms" className="hover:underline">Terms & Privacy</Link>
        </div>
        <div>“This service is designed for informational and emotional assurance purposes. We do not endorse harassment or illegal monitoring.”</div>
      </footer>
    </div>
  );
}
