#include <Arduino_JSON.h>

const int joyXPin = A0;
const int joyYPin = A1;
const int switchPin = 2;
const int maxCalibrationFrames = 5;
const int ledPin = 8;

int ledState = HIGH;

float xValue, yValue;
int startX, startY;
float pXValue = -1, pYValue = -1;
float alpha = 0.1;
int calibrationFrames = 0;

JSONVar sensorData;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);

  pinMode(ledPin, OUTPUT);
  pinMode(switchPin, INPUT);
  digitalWrite(switchPin, HIGH);
}

void loop() {

  //digitalWrite(ledPin, ledState);
  xValue = analogRead(joyXPin);
  yValue = analogRead(joyYPin);

  if (pXValue == -1) {
    pXValue = xValue;
    pYValue = yValue;
  }

  xValue = pXValue + alpha*(xValue - pXValue);
  yValue = pYValue + alpha*(yValue - pYValue);
  
  if (calibrationFrames < maxCalibrationFrames) {
    calibrationFrames++;
    startX = xValue;
    startY = yValue;
  }
  else {
    sensorData["x"] = (int) (xValue - startX);
    sensorData["y"] = (int) (yValue - startY);
    sensorData["sw"] = digitalRead(switchPin) == LOW;

    Serial.println(sensorData);
  }

  if (Serial.available() > 0) {
    String jsonString = Serial.readStringUntil("\n");
    if (jsonString != '\n') {
      JSONVar serialInput = JSON.parse(jsonString);

      if (JSON.typeof(serialInput) == "undefined") {
        Serial.println("JSON parsing failed!");
      } else {
        active = (bool) serialInput["bool"];
      }
    }
  }
  if(active)
  {
    digitalWrite(ledPin, HIGH);
  }

  pXValue = xValue;
  pYValue = yValue;
}