import React, {Component} from 'react';
import {
  View,
  Animated,
  Image,
  Text,
  TouchableOpacity,
  I18nManager,
  TextInput,
} from 'react-native';
import PropTypes, {string, func, object, number} from 'prop-types';
import {isEmpty} from 'lodash';
import {Images} from '../../theme';
import styles from './style';
import {alertBox, RfH} from '../../utils/helpers';
import {inputs} from '../../utils/constants';

class FloatingTextInput extends Component {
  constructor(props) {
    super(props);
    const {value} = this.props;
    this.position = new Animated.Value(value ? 1 : 0);
    this.state = {};
  }

  removeEmojis = (string) => {
    const regex = /\uD83C\uDFF4(?:\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74)\uDB40\uDC7F|\u200D\u2620\uFE0F)|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3]))|\uD83D\uDC69\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83D\uDC69\u200D[\u2695\u2696\u2708])\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC68(?:\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])|(?:[#*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDD1-\uDDDD])/g;
    return !isEmpty(string) ? string.replace(regex, '') : string;
  };

  _handleChange = (value) => {
    const {
      onChangeHandler,
      isSpaceAllowed,
      isOnlyAlphabetsAllowed,
      isSpecialCharactersAllowed,
    } = this.props;

    let regex = '';
    if (isEmpty(value)) {
      onChangeHandler(value);
      return;
    }
    let updateValue = value;
    if (!isSpecialCharactersAllowed) {
      regex = /^[A-Za-z0-9 ]+$/;
    } else if (isOnlyAlphabetsAllowed) {
      regex = /^[A-Za-z ]+$/;
    } else if (!isSpaceAllowed) {
      updateValue = value.replace(/\s/g, '');
    }
    if (!regex || regex.test(updateValue)) {
      onChangeHandler(updateValue);
    }
  };

  _handleFocus = () => {
    const {refKey} = this.props;
    if (!this.state[refKey]) {
      this.setState({[refKey]: true});
      //   Animated.timing(this.position, {
      //     toValue: 1,
      //     duration: 150,
      //   }).start();
    }
  };

  _handleBlur = () => {
    const {refKey} = this.props;
    if (this.state[refKey] && !this.props.value) {
      this.setState({[refKey]: false});
      //   Animated.timing(this.position, {
      //     toValue: 0,
      //     duration: 150,
      //   }).start();
    }
  };

  _returnAnimatedTitleStyles = () => {
    const isFieldActive = this.state[this.props.refKey];
    const {
      titleActiveColor,
      titleInactiveColor,
      titleActiveSize,
      titleInActiveSize,
      value,
    } = this.props;
    return {
      top: value ? -20 : isFieldActive ? -20 : 12,
      fontSize: isFieldActive ? titleActiveSize : titleInActiveSize,
      color: isFieldActive ? titleActiveColor : titleInactiveColor,
    };
  };
  _returnImageStyles = () => {
    const isFieldActive = this.state[this.props.refKey];
    const {value} = this.props;
    return {
      top: value ? -20 : isFieldActive ? -20 : 10,
      left: 0,
    };
  };

  render() {
    const {
      label,
      error,
      icon,
      handleShowPassword,
      secureTextEntry,
      showPasswordField,
      inputWidth,
      inputLabelStyle,
      textInputStyle,
      placeholder,
      autoCapitalize,
      onChangeHandler,
      value,
      autoCorrect,
      showClearButton,
      keyboardType,
      onSubmitEditing,
      refKey,
      returnKeyType,
      isSpecialCharactersAllowed,
      isOnlyAlphabetsAllowed,
      maxLength,
      infoIconEnable,
      editable,
      multiline,
      topMargin,
      isSpaceAllowed,
      handleInfoClick,
      noOfLines,
      isDetailIconEnable,
      detailIcon,
    } = this.props;
    return (
      <View>
        <View
          style={[
            {marginTop: RfH(topMargin)},
            error && {borderColor: '#b00820'},
          ]}>
          {!isEmpty(label) && (
            <View style={styles.labelViewStyle}>
              {/* <TouchableOpacity
            style={[
             { position:'absolute',
              left:0,
            },
            this._returnAnimatedTitleStyles(),
            ]}
            onPress={() => alertBox('Info', infoText)}>
              <Image
                source={Images.forgotPassword}
                style={styles.infoIconStyle}
              />
            </TouchableOpacity>  */}
              <Animated.Text
                style={[
                  styles.titleStyles,
                  error && {color: '#b00820'},
                  this._returnAnimatedTitleStyles(),
                ]}>
                {label}
              </Animated.Text>
            </View>
          )}
          <View
            style={[
              styles.textInputInnerContainer,
              {height: noOfLines * RfH(34)},
            ]}>
            <View style={{flex: 1}}>
              <TextInput
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                autoCorrect={autoCorrect}
                autoCapitalize={autoCapitalize}
                autoCompleteType={'off'}
                blurOnSubmit
                value={this.removeEmojis(value)}
                style={[
                  !isEmpty(textInputStyle) ? textInputStyle : styles.inputStyle,
                  inputWidth && {width: inputWidth},
                  {
                    paddingBottom: RfH(12),
                    textAlign: I18nManager.isRTL ? 'right' : 'left',
                  },
                ]}
                keyboardType={keyboardType}
                onSubmitEditing={onSubmitEditing}
                refKey={refKey}
                ref={(input) => {
                  inputs[refKey] = input;
                }}
                multiline={multiline}
                returnKeyType={returnKeyType}
                underlineColorAndroid="transparent"
                maxLength={maxLength}
                editable={editable}
                onFocus={this._handleFocus}
                onBlur={this._handleBlur}
                onChangeText={this._handleChange}
              />
            </View>
            {!handleShowPassword &&
              showClearButton &&
              this.state.isFieldActive &&
              !isEmpty(value) && (
                <TouchableOpacity
                  style={styles.iconContainer}
                  activeOpacity={1}
                  onPress={() => handleChange('')}>
                  <Image source={Images.clear} style={styles.iconStyle} />
                </TouchableOpacity>
              )}
            {handleShowPassword && (
              <TouchableOpacity
                style={styles.iconContainer}
                activeOpacity={1}
                onPress={() => handleShowPassword(!showPasswordField)}>
                <Image source={icon} style={styles.iconStyle} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {error ? <Text style={styles.errorTextStyle}>{error}</Text> : null}
      </View>
    );
  }
}

FloatingTextInput.propTypes = {
  error: PropTypes.any,
  inputWidth: PropTypes.number,
  label: PropTypes.string,
  showPasswordField: PropTypes.bool,
  value: PropTypes.any,
  inputLabelStyle: PropTypes.any,
  textInputStyle: PropTypes.object,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  autoCorrect: PropTypes.bool,
  handleShowPassword: PropTypes.func,
  onChangeHandler: PropTypes.func,
  isNumericOnly: PropTypes.bool,
  icon: PropTypes.any,
  showClearButton: PropTypes.bool,
  keyboardType: PropTypes.string,
  onSubmitEditing: PropTypes.func,
  refKey: PropTypes.any,
  returnKeyType: PropTypes.string,
  isSpecialCharactersAllowed: PropTypes.bool,
  isOnlyAlphabetsAllowed: PropTypes.bool,
  maxLength: PropTypes.number,
  infoIconEnable: PropTypes.bool,
  multiline: PropTypes.bool,
  editable: PropTypes.bool,
  topMargin: PropTypes.number,
  isSpaceAllowed: PropTypes.bool,
  handleInfoClick: PropTypes.func,
  noOfLines: PropTypes.number,
  detailIcon: PropTypes.any,
  isDetailIconEnable: PropTypes.bool,
};

FloatingTextInput.defaultProps = {
  label: '',
  error: '',
  showPasswordField: false,
  inputWidth: 0,
  value: '',
  inputLabelStyle: {},
  textInputStyle: {},
  secureTextEntry: false,
  autoCapitalize: false,
  autoCorrect: false,
  isNumericOnly: false,
  showClearButton: true,
  keyboardType: 'default',
  returnKeyType: 'default',
  isSpecialCharactersAllowed: true,
  isOnlyAlphabetsAllowed: false,
  maxLength: null,
  infoIconEnable: false,
  multiline: false,
  editable: true,
  topMargin: 28,
  titleActiveSize: 16,
  titleInActiveSize: 16,
  titleActiveColor: 'rgba(0,0,0,0.4)',
  titleInactiveColor: 'rgba(0,0,0,0.4)',
  isSpaceAllowed: true,
  noOfLines: 1,
  isDetailIconEnable: false,
};
export default FloatingTextInput;
