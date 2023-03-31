/*
  Blink

  Turns an LED on for one second, then off for one second, repeatedly.

  Most Arduinos have an on-board LED you can control. On the UNO, MEGA and ZERO
  it is attached to digital pin 13, on MKR1000 on pin 6. LED_BUILTIN is set to
  the correct LED pin independent of which board is used.
  If you want to know what pin the on-board LED is connected to on your Arduino
  model, check the Technical Specs of your board at:
  https://www.arduino.cc/en/Main/Products

  modified 8 May 2014
  by Scott Fitzgerald
  modified 2 Sep 2016
  by Arturo Guadalupi
  modified 8 Sep 2016
  by Colby Newman

  This example code is in the public domain.

  https://www.arduino.cc/en/Tutorial/BuiltInExamples/Blink
*/
int ledState = LOW;
const int buttonPin = 2;
const int buttonPin2 = 3;
const int ledPin = 8;
const int ledPin2 = 7;
int buttonState = 0;
int button2State = 0;
int interval0 = 1000;
int interval1 = 2000;
int interval2 = 3000;
int previousMillis = 0;
// the setup function runs once when you press reset or power the board
void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  Serial.begin(9600);
  pinMode(ledPin2, OUTPUT);
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(buttonPin2, INPUT_PULLUP);
}

// the loop function runs over and over again forever
void loop() {
  buttonState = digitalRead(2);
  button2State = digitalRead(3);
  Serial.println(button2State);
  Serial.println(buttonState);
  unsigned long currentMillis = millis();
  if(buttonState == HIGH && button2State == HIGH)
  {
    if (currentMillis - previousMillis >= interval0) {
      // save the last time you blinked the LED
      previousMillis = currentMillis;

      // if the LED is off turn it on and vice-versa:
      if (ledState == LOW) {
        ledState = HIGH;
      } else {
        ledState = LOW;
      }

    // set the LED with the ledState of the variable:
    digitalWrite(ledPin, ledState);
    digitalWrite(ledPin2, ledState);
  }
  }
  else if(buttonState == LOW)
  {
    if (currentMillis - previousMillis >= interval1) {
      // save the last time you blinked the LED
      previousMillis = currentMillis;

      // if the LED is off turn it on and vice-versa:
      if (ledState == LOW) {
        ledState = HIGH;
      } else {
        ledState = LOW;
      }

    // set the LED with the ledState of the variable:
    digitalWrite(ledPin, ledState);
    digitalWrite(ledPin2, ledState);
  }
  }
  else if(button2State == LOW)
  {
    if (currentMillis - previousMillis >= interval2) {
      // save the last time you blinked the LED
      previousMillis = currentMillis;

      // if the LED is off turn it on and vice-versa:
      if (ledState == LOW) {
        ledState = HIGH;
      } else {
        ledState = LOW;
      }

    // set the LED with the ledState of the variable:
    digitalWrite(ledPin, ledState);
    digitalWrite(ledPin2, ledState);
  }
  }
}
