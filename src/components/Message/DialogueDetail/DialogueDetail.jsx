import { useNavigate } from 'react-router-dom';
import { translateParamsToEN } from '../../../funcs&hooks/translateParamsToEN';
import Dialogue from 'components/Dialogue/Dialogue';
import Text from 'components/Shared/Text/Text';
import Button from 'components/Shared/Button';

import s from './DialogueDetail.module.scss';

const DialogueDetail = ({ selectedDialogue }) => {
  const navigate = useNavigate();

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
        {!userDialogue && (
          <Text
            text={'Виберіть діалог щоб побачити повідомлення'}
            textClass="productLabels"
          />
        )}
        {userDialogue && (
          <>
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
                    text={`ціна: ${selectedDialogue.productInfo.price}`}
                    textClass="after-title"
                  />
                </div>
              </div>
              <div className={s.productNavigate}>
                <Button
                  text="До товару"
                  btnClass="btnLight"
                  handleClick={handleButtonClick}
                />
              </div>
            </div>
            <div className={s.dialogueBox}>
              <Dialogue productInfo={{ _id, owner, userDialogue }} />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default DialogueDetail;
