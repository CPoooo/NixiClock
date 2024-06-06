import time
import board
import neopixel
import json
import os
import stat
import math

class LED:
	OFF = 0
	STATIC = 1
	BREATHING = 2
	COLOR_FADE = 3
	MOVING_RAINBOW = 4
	TEST = 5
	digitMap = (0,1,3,4,6,7)
	R = [255,255,255,255,255,255]
	G = [255,255,255,255,255,255]
	B = [255,255,255,255,255,255]

	################################################################
	#                                                              #
	#                    LED Control Functions                     #
	#                                                              #
	################################################################
	def __init__(self):
		self.pixels = neopixel.NeoPixel(board.D12, 120, brightness=1, auto_write=False, pixel_order=neopixel.GRB)
		self.H = (0,0,0,0,0,0)
		self.S = (1.0,1.0,1.0,1.0,1.0,1.0)
		self.V = (1.0,1.0,1.0,1.0,1.0,1.0)
		self.NightH = (0,0,0,0,0,0)
		self.NightS = (1.0,1.0,1.0,1.0,1.0,1.0)
		self.NightV = (.01,.01,.01,.01,.01,.01)
		self.Mode = 0
		self.NightMode = 0
		self.Speed = 1.0
		self.updateTime = 0
		self.EndTime = 270
		self.StartTime = 1290
		self.tfTime = 0
		self.Night = 0
		self.NightSec = 0
		self.SetNight = 0
		self.lastModified = 0
		self.testVal = 0
	#################################################################
	# Read the settings file and update the values if they changed  #
	#################################################################
	def readSettings(self):
		fileStatsObj = os.stat('/home/pi/clock/settings.json')
		modificationTime = time.ctime(fileStatsObj[stat.ST_MTIME])
		if self.lastModified != modificationTime:
			time.sleep(.25)
			with open('/home/pi/clock/settings.json') as f:
				jsonObj = json.load(f)
				self.H = jsonObj['H']
				self.S = jsonObj['S']
				self.V = jsonObj['V']
				self.NightH = jsonObj['NightH']
				self.NightS = jsonObj['NightS']
				self.NightV = jsonObj['NightV']
				self.Mode = jsonObj['Mode']
				self.NightMode = jsonObj['NightMode']
				self.Speed = jsonObj['Speed']
				self.StartTime = jsonObj['StartTime']
				self.EndTime = jsonObj['EndTime']
				self.tfTime = jsonObj['tfTime']
				self.NightModeOff = jsonObj['NightModeOff']
				self.NightSec = jsonObj['NightSec']
				self.SetNight = jsonObj['SetNight']
				self.lastModified = modificationTime
				# Setup colors for the modes
				if self.Mode == self.COLOR_FADE:
					for i in range(0,6):
						if self.Mode == self.COLOR_FADE:
							self.H[i] = 0
						if self.NightMode == self.COLOR_FADE:
							self.NightH[i] = 0
				if self.Mode == self.MOVING_RAINBOW:
					for i in range(0,6):
						if self.Mode == self.MOVING_RAINBOW:
							self.H[i] = i*15
						if self.NightMode == self.MOVING_RAINBOW:
							self.NightH[i] = i*15
	################################################################
	# Clear all the values in the pixel array                      #
	################################################################
	def Clear(self):
		self.pixels.fill((0,0,0))
	################################################################
	# Write the array values to the pixel                          #
	################################################################
	def Show(self):
		self.pixels.show()
	#################################################################
	# Update the pixel array to show the value in the correct digit #
	#################################################################
	def setValue(self, digit, value):
		x = 0
		y = 0
		if value == 0:
			x = 5 + (digit * 20)
			y = 15 + (digit * 20)
		elif value == 1:
			x = 0 + (digit * 20)
			y = 10 + (digit * 20)
		elif value == 2:
			x = 6 + (digit * 20)
			y = 16 + (digit * 20)
		elif value == 3:
			x = 1 + (digit * 20)
			y = 11 + (digit * 20)
		elif value == 4:
			x = 7 + (digit * 20)
			y = 17 + (digit * 20)
		elif value == 5:
			x = 2 + (digit * 20)
			y = 12 + (digit * 20)
		elif value == 6:
			x = 8 + (digit * 20)
			y = 18 + (digit * 20)
		elif value == 7:
			x = 3 + (digit * 20)
			y = 13 + (digit * 20)
		elif value == 8:
			x = 9 + (digit * 20)
			y = 19 + (digit * 20)
		elif value == 9:
			x = 4 + (digit * 20)
			y = 14 + (digit * 20)
		self.pixels[x] = (self.R[digit],self.G[digit],self.B[digit])
		self.pixels[y] = (self.R[digit],self.G[digit],self.B[digit])
	################################################################
	# Update the RGB values to keep the modes running              #
	################################################################
	def ColorUpdate(self):
		TempMode = self.Mode
		if (self.Night == 1 or self.SetNight == 1) and self.NightModeOff == 0:
			TempMode = self.NightMode
		if TempMode == self.OFF:
			self.Off()
		if TempMode == self.STATIC:
			self.StaticMode()
		if TempMode == self.BREATHING:
			self.Breathing()
		if TempMode == self.COLOR_FADE:
			self.ColorFade()
		if TempMode == self.MOVING_RAINBOW:
			self.MovingRainbow()
		if TempMode == self.TEST:
			self.Test()
		self.UpdateRGB()
	################################################################
	# Convert HSV values to RGB                                    #
	################################################################
	def HSVtoRGB(self,h,s,v):
		h = float(h)
		s = float(s)
		v = float(v)
		h60 = h / 60.0
		h60f = math.floor(h60)
		hi = int(h60f) % 6
		f = h60 - h60f
		p = v * (1 - s)
		q = v * (1 - f * s)
		t = v * (1 - (1 - f) * s)
		r, g, b = 0, 0, 0
		if hi == 0: r, g, b = v, t, p
		elif hi == 1: r, g, b = q, v, p
		elif hi == 2: r, g, b = p, v, t
		elif hi == 3: r, g, b = p, q, v
		elif hi == 4: r, g, b = t, p, v
		elif hi == 5: r, g, b = v, p, q
		r, g, b = int(r * 255), int(g * 255), int(b * 255)
		return r, g, b
	################################################################
	# Convert HSV values to RGB for all 6 digits                   #
	################################################################
	def UpdateRGB(self):
		if (self.Night == 0 and self.SetNight == 0) or self.NightModeOff == 1:
			for i in range(0,6):
				temp = self.HSVtoRGB(self.H[i],self.S[i],self.V[i])
				self.R[i]=temp[0]
				self.G[i]=temp[1]
				self.B[i]=temp[2]
		else:
			for i in range(0,6):
				temp = self.HSVtoRGB(self.NightH[i],self.NightS[i],self.NightV[i])
				self.R[i]=temp[0]
				self.G[i]=temp[1]
				self.B[i]=temp[2]
	################################################################
	# get the time from the system and write it to the led array   #
	################################################################
	def SetTime(self):
		if ((self.Mode != self.OFF and self.Night == 0) or (self.NightMode != self.OFF and self.Night == 1)) and self.Mode != self.TEST:
			t = time.localtime()
			currenttfTime = time.strftime("%H:%M:%S", t)
			currentTime = time.strftime("%I:%M:%S", t)
			if self.tfTime == 1:
				currentTime = currenttfTime
			# Is it day time
			timeMin = int(currenttfTime[0:2])*60 + int(currenttfTime[3:5])
			if self.StartTime > timeMin and self.EndTime < timeMin:
				self.Night = 0
			else:
				self.Night = 1
			self.Clear()
			if self.NightSec == 0 and (self.Night == 1 or self.SetNight == 1):
				for i in range(0,4):
					self.setValue(i, int(currentTime[self.digitMap[i]]))
			else:
				for i in range(0,6):
					self.setValue(i, int(currentTime[self.digitMap[i]]))
			self.Show()
	################################################################
	# Cycle all the digits from 0 to 9 to check function           #
	################################################################
	def Test(self):
		currentTime = round(time.time() * 1000)
		if (self.updateTime + 500) < currentTime:
			self.updateTime = currentTime
			self.Clear()
			for j in range(0,6):
				self.setValue(j, self.testVal)
			self.Show()
			self.testVal = (self.testVal + 1) % 10

	################################################################
	#                                                              #
	#                       LED color modes                        #
	#                                                              #
	################################################################
	################################################################
	# Static time delay     #
	################################################################
	def Off(self):
		self.Clear()
		self.Show()
		time.sleep(1)
	################################################################
	# Static time delay     #
	################################################################
	def StaticMode(self):
		time.sleep(.1750)
	################################################################
	# Cycle all the digits color forward by 2d at speed in ms      #
	################################################################
	def ColorFade(self):
		currentTime = round(time.time() * 1000)
		delayTime = self.Speed
		if (self.updateTime + delayTime) < currentTime:
			self.updateTime = currentTime
			incValue = 2
			for i in range(0,6):
				if self.Night  == 0 and self.SetNight == 0:
					self.H[i] = (self.H[i] + incValue) % 360
					self.S[i] = 1.0
				else:
					self.NightH[i] = (self.NightH[i] + incValue) % 360
					self.NightS[i] = 1.0
		time.sleep(.075)
	################################################################
	# Cycle all the digits color forward by 2d at speed in ms      #
	################################################################
	def Breathing(self):
		currentTime = round(time.time() * 1000)
		delayTime = self.Speed
		if (self.updateTime + delayTime) < currentTime:
			self.updateTime = currentTime
			incValue = .01
			for i in range(0,6):
				if self.Night  == 0 and self.SetNight == 0:
					self.V[i] = (self.V[i] + incValue) % 2
				else:
					self.NightV[i] = (self.NightV[i] + incValue) % 360
		time.sleep(.05)

	def MovingRainbow(self):
		pass

#Main Loop
def Main():
	led = LED()
	while True:
		led.readSettings()
		led.ColorUpdate()
		led.SetTime()

Main()
