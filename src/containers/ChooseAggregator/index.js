import React, {useContext, useEffect, useState} from 'react';
import * as Alert from 'react-native';
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView, CustomTextInput} from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';

function ChooseAggregator() {

  const data = [
    {
      label: 'Aggregator 1'
     },
     {
      label: 'Aggregator 2'
     },
     {
      label: 'Aggregator 3'
     },
     {
      label: 'Earthbox'
     },
     {
      label: 'Kings Enterprises'
     },
    ];

  //  const colors = [
	// 		{
	// 			label: 'red'
	// 		},
	// 		{
	// 			label: 'green'
	// 		},
	// 		{
	// 			label: 'blue'
	// 		}
	// 	];
    
  const [title4,setTitle4]=useState('Send to Aggregator');

  
  return (
    <View style={{flex: 1,backgroundColor: 'white',}}>
       <ScrollView>
            
            <View style={{flexDirection: 'row', marginTop: 30, marginBottom: 10,}}>
        <View style={{flex: .2,}}>
        <TouchableOpacity>  
                    <View>  
                    <Image style={{width: 24, height: 34, marginLeft: 24,}} source={require('../../assets/Images/AdminSelectOrder/Group10058.png')}  />   
                        
                    </View>  
                </TouchableOpacity>  
        </View>
        <View style={{flex: .8,}}>
        <TouchableOpacity>  
                    <View>  
                        <Text style={{fontSize: 20, color: '#000000', fontWeight: "bold", marginLeft: 15,}}>{title4}</Text>  
                    </View>  
                </TouchableOpacity>  
        </View>
          </View> 

          {/* <CustomTextInput
                label={'Email'}
                inputLabelStyle={commonStyles.inputLabelStyle}
                placeholder={'Please Enter Your Email'}
                value={loginForm.values.username}
                onChangeHandler={(value) =>
                  loginForm.setFieldValue('username', value)
                }
                returnKeyType={'next'}
                onSubmitEditing={() => onSubmitEditing('password')}
                error={clickLogin && loginForm.errors.username}
              /> */}
            <TextInput
        style={{height: 40,borderRadius: 10, marginLeft: 24, marginRight: 24,
          margin: 12,
          borderWidth: 1,}}
        // onChangeText={onChangeNumber}
        // value={number}
        placeholder="      Search for your location"
        // keyboardType="numeric"
      />

          <Text style={{fontSize: 17, color: '#121212', marginLeft: 24, marginTop: 15,}}>Choose Aggregator</Text>

        <View style={{flex: 1, marginTop: 10, marginRight: 24, marginLeft: 24,}}>
          <RadioButtonRN 
  data={data}
  circleSize={10}
  initial={4}
  // data={colors}
  selectedBtn={(e) => console.log(e)}
/>
</View>

<View style={{flex: 1, marginTop: 40, marginRight: 24, marginLeft: 24,}}>
              <TouchableOpacity style={{marginTop:20,
    borderRadius: 13,
    backgroundColor: 'orange',
    paddingVertical: 11,
    alignItems:'center'}} onPress={() => {_SignupFunc()}}>
                  <Text style={{fontSize: 18, color: '#ffffff'}}>CONFIRM</Text>
              </TouchableOpacity>
             </View>

            {/* <FlatList
        data={arraydata}
        // horizontal={true}
        renderItem={({ index, item }) =>
          _RenderItem(index, item)
        }
      /> */}

          </ScrollView> 
      
      
    </View>
  );
}
export default ChooseAggregator;
