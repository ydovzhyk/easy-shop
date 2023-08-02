import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
// import { Link } from 'react-router-dom';
import { translateParamsToEN } from '../../../funcs&hooks/translateParamsToEN';
import Dialogue from 'components/Dialogue/Dialogue';
// import RoundButton from 'components/Shared/RoundButton/RoundButton';
import Text from 'components/Shared/Text/Text';
import Button from 'components/Shared/Button';
// import { TfiPlus, TfiCheck } from 'react-icons/tfi';
// import { AiOutlineArrowLeft } from 'react-icons/ai';

import s from './DialogueDetail.module.scss';

const DialogueDetail = ({ selectedDialogue }) => {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  // const isTabletOrMobile = useMediaQuery({ minWidth: 480 });

  let _id = null;
  let owner = null;
  let userDialogue = null;
  let category = null;
  let subcategory = null;

  if (selectedDialogue) {
    _id = selectedDialogue.productId;
    owner = selectedDialogue.productOwner;
    userDialogue = selectedDialogue._id;
    category = selectedDialogue.productInfo.section;
    subcategory = selectedDialogue.productInfo.category;
  }

  const handleButtonClick = () => {
    const params = translateParamsToEN(category, subcategory);
    const { categoryName, subCategoryName } = params;
    const path = `/products/${categoryName}/${subCategoryName}/${_id}`;
    navigate(path);
  };

  return (
    <section className={s.dialogueDetail}>
      <div
        className={s.box}
        style={{ justifyContent: !userDialogue ? 'center' : 'initial' }}
      >
        {!userDialogue && isDesktop && (
          <Text
            text={'Виберіть діалог щоб побачити повідомлення'}
            textClass={isDesktop ? 'productLabels' : 'productLabelsNone'}
          />
        )}
        {userDialogue && (
          <div>
            <div className={s.productBox}>
              <div
                className={s.imageCard}
                style={{
                  backgroundImage: `url(${selectedDialogue.productInfo.mainPhotoUrl})`,
                }}
              ></div>
              <div className={s.productInfo}>
                <div className={s.messageBoxTitle}>
                  <Text
                    text={selectedDialogue.productInfo.nameProduct}
                    textClass="after-title-message-title"
                  />
                </div>
                <div>
                  <Text
                    text={`ціна: ${selectedDialogue.productInfo.price} грн.`}
                    textClass="after-title"
                  />
                </div>
              </div>
              <div className={s.productNavigate}>
                {/* <RoundButton
                  // text="До товару"
                  icon={TfiPlus}
                  // handleClick={handleButtonClick}
                  // id={dialogue._id}
                /> */}
                <Button
                  text="До товару"
                  btnClass="btnLightDialogueDetail"
                  handleClick={handleButtonClick}
                />
              </div>
            </div>
            <div className={s.dialogueBox}>
              <Dialogue productInfo={{ _id, owner, userDialogue }} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DialogueDetail;
