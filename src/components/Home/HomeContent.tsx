"use client"

import React, { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import AboutSection from "@/components/Home/AboutSection"
import ServicesSection from "@/components/Home/ServicesSection"
import Statistics from "@/components/Home/Statistics"
import WhyUs from "@/components/WhyUs"
import "@/styles/animations.css"
import { motion, AnimatePresence } from "framer-motion"
import { FaCalculator, FaChartBar, FaFileAlt, FaCog } from "react-icons/fa"
import { getTaxScenarios } from "@/lib/api"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend, PieChart, Pie, Cell } from 'recharts'
import { useSpring, animated, config, to } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import { useInView } from 'react-intersection-observer'

interface Card {
  id: number
  title: string
  subtitle: string
  icon: JSX.Element
  content: JSX.Element
}

interface TaxScenario {
  id: number
  description: string
  income: number
  deductions: number
}

interface TaxBracket {
  min: number
  max: number
  rate: number
}

type StrategyKey = 'retirement' | 'charitable' | 'credits'

const Slider = dynamic(() => import("@/components/Slider"), { ssr: false })
const images = [
  "/consultation/consultation1.jpg",
  "/consultation/consultation2.jpg",
  "/consultation/consultation3.jpg",
  "/consultation/consultation4.jpg",
  "/consultation/consultation5.jpg",
]

const COLORS = ['#0088FE', '#FF8042']

// Simplified 2025 U.S. tax brackets
const TAX_BRACKETS: TaxBracket[] = [
  { min: 0, max: 11000, rate: 0.10 },
  { min: 11001, max: 44725, rate: 0.12 },
  { min: 44726, max: 95375, rate: 0.22 },
  { min: 95376, max: 182100, rate: 0.24 },
  { min: 182101, max: 231250, rate: 0.32 },
  { min: 231251, max: 578125, rate: 0.35 },
  { min: 578126, max: Infinity, rate: 0.37 }
]

// Helper function for card-specific animations
function useCardSpecificAnimation(cardId: number, inView: boolean) {
  const numberProps = useSpring({
    from: { number: 0 },
    to: { number: inView && cardId === 1 ? 100 : 0 },
    config: { duration: 2000 },
    loop: inView && cardId === 1,
    delay: 1000
  })
  
  const chartProps = useSpring({
    from: { progress: 0 },
    to: { progress: inView && cardId === 2 ? 100 : 0 },
    config: { duration: 3000 },
    loop: inView && cardId === 2,
    delay: 1000
  })
  
  const gearProps = useSpring({
    from: { rotate: 0 },
    to: { rotate: inView && cardId === 3 ? 360 : 0 },
    config: { duration: 8000 },
    loop: inView && cardId === 3
  })
  
  const fileProps = useSpring({
    from: { progress: 0 },
    to: { progress: inView && cardId === 4 ? 100 : 0 },
    config: { duration: 3000 },
    loop: inView && cardId === 4,
    delay: 1500
  })
  
  if (cardId === 1) {
    return {
      icon: (
        <animated.div className="relative flex items-center justify-center w-8 h-8">
          <FaCalculator className="text-white z-10" />
          <animated.span 
            className="absolute top-0 right-0 text-xs font-mono bg-white text-blue-600 rounded-full w-5 h-5 flex items-center justify-center z-20 transform -translate-y-1 translate-x-1"
            style={{ transform: numberProps.number.to(n => `scale(${1 + (n % 20) / 100}) translate(1px, -1px)`) }}
          >
            $
          </animated.span>
        </animated.div>
      ),
      background: (
        <div className="absolute inset-0 opacity-20">
          {[...Array(5)].map((_, i) => (
            <animated.div
              key={i}
              className="absolute bg-white rounded-full w-2 h-2"
              style={{
                left: `${10 + i * 20}%`,
                top: `${40 + Math.sin(i) * 20}%`,
                opacity: numberProps.number.to(n => Math.sin((n + i * 30) / 20) * 0.5 + 0.5),
                transform: numberProps.number.to(n => `translateY(${Math.sin((n + i * 30) / 20) * 20}px)`)
              }}
            />
          ))}
        </div>
      )
    }
  }
  
  if (cardId === 2) {
    return {
      icon: (
        <div className="relative">
          <FaChartBar />
          <animated.div 
            className="absolute bottom-0 left-0 right-0 bg-white"
            style={{ 
              height: chartProps.progress.to(p => `${p*0.02}em`),
              opacity: 0.6 
            }}
          />
        </div>
      ),
      background: (
        <div className="absolute inset-0 opacity-20">
          {[...Array(3)].map((_, i) => (
            <animated.div
              key={i}
              className="absolute bg-white h-1 bottom-3 rounded-full"
              style={{
                left: '10%',
                width: chartProps.progress.to(p => `${10 + (i * 15) + (p/5)}%`),
                bottom: `${10 + i * 10}%`,
                opacity: chartProps.progress.to(p => Math.min(1, p/50 + 0.2))
              }}
            />
          ))}
        </div>
      )
    }
  }
  
  if (cardId === 3) {
    return {
      icon: (
        <animated.div 
          style={{ transform: gearProps.rotate.to(r => `rotate(${r}deg)`) }}
        >
          <FaCog />
        </animated.div>
      ),
      background: (
        <div className="absolute inset-0 opacity-20">
          {[...Array(3)].map((_, i) => (
            <animated.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: `${8 + i*4}px`,
                height: `${8 + i*4}px`,
                top: `${20 + i * 30}%`,
                left: `${70 - i * 20}%`,
                transform: gearProps.rotate.to(
                  r => `rotate(${-r + i*30}deg) translateX(${10 + i*5}px)`
                )
              }}
            />
          ))}
        </div>
      )
    }
  }
  
  if (cardId === 4) {
    return {
      icon: (
        <div className="relative">
          <FaFileAlt />
          <animated.div 
            className="absolute top-0 bottom-0 left-0 bg-white opacity-30"
            style={{ width: fileProps.progress.to(p => `${p}%`) }}
          />
        </div>
      ),
      background: (
        <div className="absolute inset-0 opacity-20">
          <animated.div 
            className="absolute w-12 h-12 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
              top: '20%',
              left: '60%',
              transform: fileProps.progress.to(
                p => `scale(${0.5 + Math.sin(p/10) * 0.3})`
              ),
              opacity: fileProps.progress.to(
                p => 0.3 + Math.sin(p/10) * 0.2
              )
            }}
          />
        </div>
      )
    }
  }
  
  return {
    icon: <></>,
    background: <></>
  }
}

function getGradientForCard(cardId: number, active: boolean) {
  const intensity = active ? '600' : '500'
  const secondary = active ? '700' : '600'
  
  switch(cardId) {
    case 1: 
      return `linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)`
    case 2:
      return `linear-gradient(135deg, #10B981 0%, #065F46 100%)`
    case 3:
      return `linear-gradient(135deg, #8B5CF6 0%, #5B21B6 100%)`
    case 4:
      return `linear-gradient(135deg, #F59E0B 0%, #B45309 100%)`
    default:
      return `linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)`
  }
}

const AnimatedCard: React.FC<{
  card: Card
  isExpanded: boolean
  onToggle: () => void
  index: number
  onApplyScenario?: (scenario: TaxScenario) => void
}> = ({ card, isExpanded, onToggle, index, onApplyScenario }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  })
  
  const [{ rotateX, rotateY, scale, y }, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    y: 0,
    config: { mass: 1, tension: 180, friction: 12 }
  }))
  
  const [{ background, boxShadow }] = useSpring(() => ({
    from: { background: getGradientForCard(card.id, false), boxShadow: '0 4px 15px rgba(0,0,0,0.1)' },
    to: { background: getGradientForCard(card.id, true), boxShadow: '0 10px 25px rgba(0,0,0,0.2)' },
    config: { duration: 3000 },
    loop: { reverse: true }
  }))
  
  const specificAnimation = useCardSpecificAnimation(card.id, inView)

  const bind = useGesture({
    onHover: ({ hovering }) => 
      api.start({ scale: hovering ? 1.05 : 1, config: config.wobbly }),
    onMove: ({ xy: [mx, my], event }) => { 
      if (!isExpanded) {
        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const rotateXVal = (my - centerY) / 25
        const rotateYVal = (mx - centerX) / 25
        api.start({ rotateX: -rotateXVal, rotateY: rotateYVal })
      }
    },
    onMouseLeave: () => api.start({ rotateX: 0, rotateY: 0 })
  })

  const entryAnimation = useSpring({
    from: { opacity: 0, y: 50 },
    to: { opacity: inView ? 1 : 0, y: inView ? 0 : 50 },
    delay: index * 200,
    config: { tension: 120, friction: 14 }
  })
  
  return (
    <animated.div 
      ref={ref}
      style={{
        ...entryAnimation,
        transform: isExpanded 
          ? 'scale(1.05)'
          : to([rotateY, rotateX, scale], 
              (rY, rX, s) => `perspective(1200px) rotateY(${rY}deg) rotateX(${rX}deg) scale(${s})`)
      }}
      className="relative overflow-hidden rounded-xl"
      {...bind()}
    >
      <animated.div
        className="p-6 text-white h-full"
        style={{ background, boxShadow }}
      >
        <div className="relative z-10">
          <div 
            className="flex items-center space-x-4 cursor-pointer" 
            onClick={onToggle}
          >
            <div className="text-4xl relative">
              {specificAnimation.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold">{card.title}</h3>
              <p className="text-sm opacity-80">{card.subtitle}</p>
            </div>
          </div>
          
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {specificAnimation.background}
          </div>
        </div>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="mt-4 p-4 bg-white text-gray-800 rounded-lg overflow-visible backdrop-blur-sm"
              style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              {card.content}
            </motion.div>
          )}
        </AnimatePresence>
      </animated.div>
    </animated.div>
  )
}

export default function HomeContent() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [scenarios, setScenarios] = useState<TaxScenario[]>([])
  const [income, setIncome] = useState<number>(50000)
  const [deductions, setDeductions] = useState<number>(10000)
  const [taxPlan, setTaxPlan] = useState<{
    income: number
    deductions: number
    estimatedTax: number
    strategies: Record<StrategyKey, boolean>
    createdAt: string
  } | null>(null)
  const [selectedScenarios, setSelectedScenarios] = useState<number[]>([])
  const [strategies, setStrategies] = useState<Record<StrategyKey, boolean>>({
    retirement: false,
    charitable: false,
    credits: false
  })
  const [timelineMonth, setTimelineMonth] = useState<number>(0)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    async function fetchScenarios() {
      try {
        const data = await getTaxScenarios()
        // Validate scenarios
        const validScenarios = data.filter(
          (s: TaxScenario) =>
            typeof s.id === 'number' &&
            typeof s.description === 'string' &&
            typeof s.income === 'number' && s.income >= 0 &&
            typeof s.deductions === 'number' && s.deductions >= 0
        )
        setScenarios(validScenarios)
      } catch (error) {
        console.error("Error fetching scenarios:", error)
        setError("Failed to load tax scenarios.")
      }
    }
    fetchScenarios()
  }, [])

  const calculateTax = (
    inc: number = income,
    ded: number = deductions,
    strats: Record<StrategyKey, boolean> = strategies
  ) => {
    // Validate inputs
    if (inc < 0 || ded < 0 || ded > inc) {
      return 0
    }

    let taxableIncome = inc - ded
    // Apply strategies with realistic caps
    if (strats.retirement) {
      taxableIncome -= Math.min(inc * 0.1, 23000) // Max 401(k) contribution
    }
    if (strats.charitable) {
      taxableIncome -= Math.min(inc * 0.05, 10000) // Max charitable deduction
    }
    if (strats.credits) {
      taxableIncome -= 2000 // Simplified tax credit
    }

    // Ensure taxable income is not negative
    taxableIncome = Math.max(0, taxableIncome)

    let tax = 0
    let remainingIncome = taxableIncome
    for (const bracket of TAX_BRACKETS) {
      if (remainingIncome <= 0) break
      const taxableInBracket = Math.min(
        remainingIncome,
        bracket.max - bracket.min
      )
      tax += taxableInBracket * bracket.rate
      remainingIncome -= taxableInBracket
    }
    return tax
  }

  const getTaxBracketData = (inc: number = income, ded: number = deductions) => {
    if (inc < 0 || ded < 0 || ded > inc) {
      return []
    }
    const taxableIncome = Math.max(0, inc - ded)
    const data = TAX_BRACKETS.map((bracket, index) => {
      const taxableInBracket = Math.min(
        taxableIncome,
        bracket.max
      ) - (index > 0 ? TAX_BRACKETS[index - 1].max : 0)
      return {
        name: `${(bracket.rate * 100).toFixed(0)}%`,
        value: taxableInBracket > 0 ? taxableInBracket : 0,
        rate: bracket.rate
      }
    }).filter(d => d.value > 0)
    return data
  }

  const handleCreatePlan = () => {
    if (income < 0 || deductions < 0 || deductions > income) {
      setError("Invalid income or deductions.")
      return
    }
    const newPlan = {
      income,
      deductions,
      estimatedTax: calculateTax(),
      strategies: { ...strategies },
      createdAt: new Date().toLocaleString(),
    }
    setTaxPlan(newPlan)
    setTimelineMonth(0)
    setError("")
  }

  const resetPlan = () => {
    setTaxPlan(null)
    setTimelineMonth(0)
    setStrategies({ retirement: false, charitable: false, credits: false })
    setError("")
  }

  const handleApplyScenario = (scenario: TaxScenario) => {
    if (scenario.income < 0 || scenario.deductions < 0 || scenario.deductions > scenario.income) {
      setError("Invalid scenario data.")
      return
    }
    setIncome(scenario.income)
    setDeductions(scenario.deductions)
    setExpandedCard(1)
    setError("")
  }

  const handleToggleStrategy = (strategy: StrategyKey) => {
    setStrategies(prev => ({ ...prev, [strategy]: !prev[strategy] }))
  }

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    value: string
  ) => {
    // Sanitize input: remove non-numeric characters except decimal point
    const cleanValue = value.replace(/[^0-9.]/g, '')
    const numValue = parseFloat(cleanValue)
    if (!isNaN(numValue) && numValue >= 0) {
      setter(numValue)
      setError("")
    } else if (cleanValue === '') {
      setter(0)
      setError("")
    } else {
      setError("Please enter a valid non-negative number.")
    }
  }

  const cards: Card[] = [
    {
      id: 1,
      title: "Calculate Taxes Owed",
      subtitle: "Visualize your tax brackets",
      icon: <FaCalculator />,
      content: (
        <div>
          <h4 className="font-semibold">Tax Bracket Visualizer</h4>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          <div className="space-y-4 mt-2">
            <div>
              <label className="block text-sm">Income ($)</label>
              <input
                type="text"
                value={income}
                onChange={(e) => handleInputChange(setIncome, e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter income (e.g., 50000)"
              />
            </div>
            <div>
              <label className="block text-sm">Deductions ($)</label>
              <input
                type="text"
                value={deductions}
                onChange={(e) => handleInputChange(setDeductions, e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter deductions (e.g., 10000)"
              />
            </div>
            <p className="text-lg font-bold">
              Estimated Tax: ${calculateTax().toFixed(2)}
            </p>
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={getTaxBracketData()}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Taxable Income']}
                    contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '8px' }}
                  />
                  <Bar dataKey="value" fill="#3B82F6">
                    {getTaxBracketData().map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.value > 0 ? '#3B82F6' : '#E5E7EB'}
                        filter={entry.value > 0 ? "url(#glow)" : undefined}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Analyze Tax Scenario",
      subtitle: "Compare tax situations",
      icon: <FaChartBar />,
      content: (
        <div>
          <h4 className="font-semibold">Scenario Comparison</h4>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          {scenarios.length > 0 ? (
            <div className="space-y-2 mt-2">
              <p className="text-sm">Select scenarios to compare:</p>
              <div className="flex flex-wrap gap-2">
                {scenarios.map((scenario) => (
                  <motion.button
                    key={scenario.id}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedScenarios.includes(scenario.id)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                    onClick={() => setSelectedScenarios(prev =>
                      prev.includes(scenario.id)
                        ? prev.filter(id => id !== scenario.id)
                        : [...prev, scenario.id]
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {scenario.description}
                  </motion.button>
                ))}
              </div>
              <motion.div
                className="mt-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={scenarios.filter(s => selectedScenarios.includes(s.id))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="description" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [`$${value.toLocaleString()}`, null]}
                      contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '8px' }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="income"
                      stroke="#10B981"
                      activeDot={{ r: 8 }}
                      animationDuration={1500}
                    />
                    <Line
                      type="monotone"
                      dataKey={(s: TaxScenario) => calculateTax(s.income, s.deductions, { retirement: false, charitable: false, credits: false })}
                      name="Tax"
                      stroke="#F59E0B"
                      activeDot={{ r: 8 }}
                      animationDuration={1500}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
              <div className="mt-2">
                {scenarios.filter(s => selectedScenarios.includes(s.id)).map((scenario) => (
                  <motion.div
                    key={scenario.id}
                    className="p-2 bg-gray-100 rounded flex justify-between items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div>
                      <p>{scenario.description}</p>
                      <p>Income: ${scenario.income.toFixed(2)}</p>
                      <p>Tax: ${calculateTax(scenario.income, scenario.deductions, { retirement: false, charitable: false, credits: false }).toFixed(2)}</p>
                    </div>
                    <motion.button
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      onClick={() => handleApplyScenario(scenario)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Apply
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <p className="mt-2 text-gray-600">No scenarios available.</p>
          )}
        </div>
      ),
    },
    {
      id: 3,
      title: "Apply Tax Strategies",
      subtitle: "Simulate tax savings",
      icon: <FaCog />,
      content: (
        <div>
          <h4 className="font-semibold">Strategy Impact Simulator</h4>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          <p className="text-sm mt-2">Toggle strategies to see tax savings:</p>
          <div className="space-y-2 mt-2">
            {[
              { key: 'retirement' as StrategyKey, label: 'Maximize Retirement Contributions (up to $23,000)' },
              { key: 'charitable' as StrategyKey, label: 'Leverage Charitable Deductions (up to $10,000)' },
              { key: 'credits' as StrategyKey, label: 'Apply Tax Credits ($2,000)' }
            ].map((strat) => (
              <motion.div
                key={strat.key}
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <input
                  type="checkbox"
                  checked={strategies[strat.key]}
                  onChange={() => handleToggleStrategy(strat.key)}
                  className="h-5 w-5"
                />
                <label>{strat.label}</label>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Tax Savings', value: calculateTax(income, deductions, { retirement: false, charitable: false, credits: false }) - calculateTax() },
                    { name: 'Remaining Tax', value: calculateTax() }
                  ]}
                  dataKey="value"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={2}
                  animationDuration={1500}
                  animationBegin={300}
                  label
                >
                  <Cell fill="#10B981" />
                  <Cell fill="#F59E0B" />
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, null]}
                  contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
          <p className="text-lg font-bold mt-2">
            Tax Savings: ${(calculateTax(income, deductions, { retirement: false, charitable: false, credits: false }) - calculateTax()).toFixed(2)}
          </p>
        </div>
      ),
    },
    {
      id: 4,
      title: "Create Tax Plan",
      subtitle: "Build a custom tax strategy",
      icon: <FaFileAlt />,
      content: (
        <div>
          <h4 className="font-semibold">Tax Plan Creator</h4>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          <p className="mt-2">
            Use the calculator above to set your income, deductions, and strategies, then click Create Plan.
          </p>
          <motion.button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleCreatePlan}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create Plan
          </motion.button>
          <AnimatePresence>
            {taxPlan && (
              <motion.div
                className="mt-4 p-4 bg-gray-100 rounded-lg text-center overflow-visible"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h5 className="font-semibold mb-2">Your Tax Plan Summary</h5>
                <p>Created: {taxPlan.createdAt}</p>
                <p>Income: ${taxPlan.income.toFixed(2)}</p>
                <p>Deductions: ${taxPlan.deductions.toFixed(2)}</p>
                <p>Strategies Applied: {Object.entries(taxPlan.strategies)
                  .filter(([_, value]) => value)
                  .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
                  .join(', ') || 'None'}</p>
                <motion.div 
                  className="flex justify-center my-4 overflow-visible" 
                  style={{ height: 200 }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <defs>
                        <linearGradient id="taxColorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0088FE" stopOpacity={0.8}/>
                          <stop offset="100%" stopColor="#0088FE" stopOpacity={0.2}/>
                        </linearGradient>
                        <linearGradient id="remainingColorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FF8042" stopOpacity={0.8}/>
                          <stop offset="100%" stopColor="#FF8042" stopOpacity={0.2}/>
                        </linearGradient>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="3" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>
                      <Pie
                        data={[
                          { name: 'Tax', value: calculateTax(taxPlan.income, taxPlan.deductions, taxPlan.strategies) },
                          { name: 'Remaining', value: taxPlan.income - calculateTax(taxPlan.income, taxPlan.deductions, taxPlan.strategies) }
                        ]}
                        dataKey="value"
                        innerRadius={40}
                        outerRadius={60}
                        paddingAngle={2}
                        animationDuration={1500}
                        animationBegin={300}
                        label
                        filter="url(#glow)"
                      >
                        <Cell fill="url(#taxColorGradient)" stroke="#0088FE" />
                        <Cell fill="url(#remainingColorGradient)" stroke="#FF8042" />
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => [`$${value.toLocaleString()}`, null]}
                        contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '8px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </motion.div>
                <div className="mt-4">
                  <label className="block text-sm">Tax Savings Progress (Months)</label>
                  <input
                    type="range"
                    min={0}
                    max={12}
                    value={timelineMonth}
                    onChange={(e) => setTimelineMonth(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-sm">Month: {timelineMonth}</p>
                  <p className="text-sm">
                    Cumulative Savings: ${(
                      (calculateTax(taxPlan.income, taxPlan.deductions, { retirement: false, charitable: false, credits: false }) -
                      calculateTax(taxPlan.income, taxPlan.deductions, taxPlan.strategies)) * (timelineMonth / 12)
                    ).toFixed(2)}
                  </p>
                </div>
                <motion.button
                  className="mt-2 px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={resetPlan}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear Plan
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ),
    },
  ]

  return (
    <main className="overflow-hidden">
      <section className="fade-in">
        <Slider
          title="Home"
          description="Unlock your financial potential with expert guidance"
          images={images}
          btnText="Get Started"
          btnHref="contact/get-a-consultation"
        />
      </section>
      <section className="py-16 md:py-24 bg-white fade-in fade-in-delay-1">
        <AboutSection />
      </section>
      <section className="py-16 md:py-24 bg-gray-50 fade-in fade-in-delay-2">
        <ServicesSection />
      </section>
      <section className="py-16 md:py-24 bg-white fade-in fade-in-delay-3">
        <Statistics />
      </section>
      <section className="py-16 md:py-24 bg-gray-50 fade-in fade-in-delay-4">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Interactive Tax Planning Tools
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {cards.map((card, idx) => (
              <AnimatedCard
                key={card.id}
                card={card}
                index={idx}
                isExpanded={expandedCard === card.id}
                onToggle={() => setExpandedCard(expandedCard === card.id ? null : card.id)}
                onApplyScenario={card.id === 2 ? handleApplyScenario : undefined}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24 bg-white fade-in fade-in-delay-5">
        <WhyUs />
      </section>
      <section className="fade-in fade-in-delay-6">
        <Slider
          description="Building wealth, creating futures."
          images={["/contact/GettyImages-1440181617-scaled.jpg"]}
        />
      </section>
      <section className="fade-in fade-in-delay-7 mb-16 md:mb-24">
        <Slider
          title="Team"
          description="Get to know the incredible individuals behind our company"
          images={["/team/GettyImages-1407840013-scaled.jpg"]}
          btnText="Our People"
          btnHref="about"
        />
      </section>
    </main>
  )
}
