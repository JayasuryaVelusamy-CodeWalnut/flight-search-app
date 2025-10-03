import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import FlightSearch from '../views/FlightSearch.vue'
import FlightTypeSwitch from '../components/FlightTypeSwitch.vue'
import AirportSelect from '../components/AirportSelect.vue'
import DatePicker from '../components/DatePicker.vue'
import PassengerSelector from '../components/PassengerSelector.vue'
import SearchButton from '../components/SearchButton.vue'
import { fetchAirports } from '../api/airportService'

vi.mock('../api/airportService', () => ({
  fetchAirports: vi.fn().mockResolvedValue([
    {
      code: 'JFK',
      name: 'John F. Kennedy International Airport',
      countryCode: 'US',
      connections: [{ code: 'LAX' }, { code: 'SFO' }]
    },
    {
      code: 'LAX',
      name: 'Los Angeles International Airport',
      countryCode: 'US',
      connections: [{ code: 'JFK' }, { code: 'SFO' }]
    },
    {
      code: 'SFO',
      name: 'San Francisco International Airport',
      countryCode: 'US',
      connections: [{ code: 'JFK' }, { code: 'LAX' }]
    }
  ])
}))

describe('FlightSearch', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(FlightSearch)
  })

  it('renders all required components', () => {
    expect(wrapper.findComponent(FlightTypeSwitch).exists()).toBe(true)
    expect(wrapper.findComponent(AirportSelect).exists()).toBe(true)
    expect(wrapper.findComponent(DatePicker).exists()).toBe(true)
    expect(wrapper.findComponent(PassengerSelector).exists()).toBe(true)
    expect(wrapper.findComponent(SearchButton).exists()).toBe(true)
  })

  it('fetches airports on mount', () => {
    expect(fetchAirports).toHaveBeenCalled()
  })

  it('initializes with default values', () => {
    const vm = wrapper.vm as any
    expect(vm.tripType).toBe('return')
    expect(vm.originCode).toBe('')
    expect(vm.destinationCode).toBe('')
    expect(vm.passengers).toEqual({ adults: 1, children: 0, infants: 0 })
  })

  it('updates trip type when FlightTypeSwitch emits update', async () => {
    await wrapper.findComponent(FlightTypeSwitch).vm.$emit('update:modelValue', 'one-way')
    expect((wrapper.vm as any).tripType).toBe('one-way')
    expect((wrapper.vm as any).returnDate).toBe('')
  })

  it('updates origin and destination when AirportSelect emits update', async () => {
    const airportSelect = wrapper.findComponent(AirportSelect)
    await airportSelect.vm.$emit('update:originCode', 'JFK')
    await airportSelect.vm.$emit('update:destinationCode', 'LAX')
    const vm = wrapper.vm as any
    expect(vm.originCode).toBe('JFK')
    expect(vm.destinationCode).toBe('LAX')
  })

  it('updates passenger counts when PassengerSelector emits update', async () => {
    const passengerSelector = wrapper.findComponent(PassengerSelector)
    await passengerSelector.vm.$emit('update:adults', 2)
    await passengerSelector.vm.$emit('update:children', 1)
    await passengerSelector.vm.$emit('update:infants', 1)
    const vm = wrapper.vm as any
    expect(vm.passengers).toEqual({ adults: 2, children: 1, infants: 1 })
  })

  it('validates search form correctly', async () => {
    const vm = wrapper.vm as any
    vm.originCode = 'JFK'
    await wrapper.vm.$nextTick()
    vm.destinationCode = 'LAX'
    await wrapper.vm.$nextTick()
    vm.departureDate = '2025-12-01'
    await wrapper.vm.$nextTick()
    vm.returnDate = '2025-12-10'
    await wrapper.vm.$nextTick()

    expect(vm.isValid).toBe(true)

    vm.tripType = 'one-way'
    vm.returnDate = ''
    await wrapper.vm.$nextTick()
    
    expect(vm.isValid).toBe(true)

    vm.departureDate = ''
    await wrapper.vm.$nextTick()
    
    // Should be invalid without departure date
    expect(vm.isValid).toBe(false)
  })

  it('shows search summary after successful search', async () => {
    const vm = wrapper.vm as any
    
    // Set required fields
    vm.originCode = 'JFK'
    vm.destinationCode = 'LAX'
    vm.departureDate = '2025-12-01'
    vm.returnDate = '2025-12-10'
    await wrapper.vm.$nextTick()

    // Trigger search
    await wrapper.findComponent(SearchButton).trigger('click')

    // Wait for the search delay
    await new Promise(resolve => setTimeout(resolve, 800))

    // Search summary should be visible
    expect(wrapper.text()).toContain('Search Summary')
    expect(wrapper.text()).toContain('JFK → LAX')
    expect(wrapper.text()).toContain('01-12-2025') // Formatted departure date
    expect(wrapper.text()).toContain('10-12-2025') // Formatted return date
  })

  it('formats dates correctly in search summary', async () => {
    const vm = wrapper.vm as any
    
    vm.originCode = 'JFK'
    vm.destinationCode = 'LAX'
    vm.departureDate = '2025-12-01'
    vm.returnDate = '2025-12-10'
    vm.searched = true
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick() // Double tick to ensure all updates are processed

    expect(wrapper.text()).toContain('01-12-2025') // Departure date
    expect(wrapper.text()).toContain('10-12-2025') // Return date
  })
})