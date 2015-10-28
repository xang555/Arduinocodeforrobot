#include <motor_driver.h>
#include<ctype.h>
#define N1 22
#define N2  23
#define N3 24
#define N4 25
#define PWM_A 26
#define PWM_B 27

String inputString="";
int PWM=255;
void setup()                    // run once, when the sketch starts
{
 Serial.begin(9600);            // set the baud rate to 9600, same should be of your Serial Monitor
 //setup pin motrodriver 1
    pinMode(N1,OUTPUT);
  pinMode(N2,OUTPUT);
   pinMode(N3,OUTPUT);
  pinMode(N4,OUTPUT);
   pinMode(PWM_A,OUTPUT);
  pinMode(PWM_B,OUTPUT);
 
}

void loop()
{
  if(Serial.available()){
  while(Serial.available())
    {
      char inChar = (char)Serial.read(); //read the input
      inputString += inChar;        //make a string of the characters coming on serial
    }
    Serial.println(inputString);
        // clear the serial buffer
    if(inputString == "l"){         //trun left
       m1_rtl(N1,N2,PWM_A,PWM);
       m2_ltr(N3,N4,PWM_B,PWM);
     
    }else if(inputString == "r"){   //trun rigth
       m1_ltr(N1,N2,PWM_A,PWM);
       m2_rtl(N3,N4,PWM_B,PWM);
    
    }else if(inputString == "u"){ //up
       m1_rtl(N1,N2,PWM_A,PWM);
       m2_rtl(N3,N4,PWM_B,PWM);
     
    }else if(inputString == "d"){ //down
      m1_ltr(N1,N2,PWM_A,PWM);
       m2_ltr(N3,N4,PWM_B,PWM);
    
    }else if(inputString=="s"){ //stop
       m1_stop(N1,N2,PWM_A);
      m2_stop(N3,N4,PWM_B);
     
       }
         inputString = "";
  }
}
