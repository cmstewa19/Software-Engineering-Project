import { useEffect, useState } from 'react';
import NavigationButton from '../components/navigationButton';

const buttonStyleProps = {
  justifyContent: 'flex-start',
  width: '100%',
  alignItems: 'center',
  fontSize: 'md',
  borderRadius: 'md',
  mb: 4,
  bg: '#F4B860',
  color: 'black',
  _hover: {
    bg: '#d7a247',
  },
  boxShadow: 'md',
};

const Sidebar = ({ isMinimized, toggleSidebar, isMobileMenuOpen, statusOfAlerts }) => {
  const navigate = useNavigate();

  const sidebarVariants = {
    collapsed: {
      width: '80px',
      transition: {
        width: { duration: 0.2, ease: 'easeInOut' },
      },
    },
    expanded: {
      width: '190px',
      transition: {
        width: { duration: 0.2, ease: 'easeInOut' },
      },
    },
  };

  if (loading) {
    return null;
  }

  const renderButtons = (isMinimized) => {
    const buttons = buttonConfig[userEmail] || buttonConfig['default'];
    return isMinimized ? (
      <MinimizedSidebarContent buttons={buttons} navigate={navigate} />
    ) : (
      <SidebarContent buttons={buttons} navigate={navigate} />
    );
  };

  return (
    <MotionFlex
      as="aside"
      bg="gray.800"
      position="fixed"
      left="2"
      height="calc(90%-64px)"
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
      borderRadius="20px"
      variants={sidebarVariants}
      initial={isMinimized ? 'collapsed' : 'expanded'}
      animate={isMinimized ? 'collapsed' : 'expanded'}
      zIndex="1000"
      flexShrink={0}
      flexDirection="column"
      display={{ base: isMobileMenuOpen ? 'flex' : 'none', md: 'flex' }}
      pt={isMinimized ? '0' : '20px'}
      mt={statusOfAlerts ? '2rem' : '6rem'}
    >
      <Box overflowY="auto" height="100%">
        {isMinimized ? (
          <Box mb={'-4rem'} p="4" display="flex" justifyContent="center">
            <img
              src={'../assests/rail.png'}
              alt="rail.png"
              style={{ height: '40px', width: 'auto', cursor: 'pointer' }}
              onClick={() => handleNavigation()}
            />
          </Box>
        ) : (
          <motion.div >
            <Box ml={'2rem'}>
              <img
                src={'../assests/rail.png'}
                alt="rail.png"
                style={{ height: '40px', width: 'auto', cursor: 'pointer' }}
                onClick={() => handleNavigation()}
              />
            </Box>
          </motion.div>
        )}
        <Stack
          flex="1"
          py={{ base: '6', sm: '8' }}
          px={{ base: '2', sm: '5' }}
          bg="transparent"
          color="white"
          justifyContent="center"
        >
          {renderButtons(isMinimized)}
        </Stack>
      </Box>
      <Box mt="auto" p="4" justifyContent={'center'} display={'flex'}>
        <IconButton
          icon={<Box 
            as={motion.div}
            initial={isMinimized ? { rotate: 180 } : { rotate: 0 }}
            animate={isMinimized ? { rotate: 0 } : { rotate: 180 }}
          >
            {isMinimized ? <FaChevronRight /> : <FaChevronLeft />}
          </Box>}
          onClick={toggleSidebar}
          aria-label={isMinimized ? 'Expand' : 'Minimize'}
          bg="#F4B860"
          color="black"
          _hover={{ bg: '#d7a247' }}
          _focus={{ boxShadow: 'none' }}
          size="lg"
          rounded="full"
        />
      </Box>
    </MotionFlex>
  );
};

const SidebarContent = ({ buttons, navigate }) => (
  <>
    {buttons.map((btn, index) => (
      <MotionButton
        key={index}
        leftIcon={btn.icon}
        onClick={() => navigate(btn.route)}
        {...buttonStyleProps}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {btn.label}
      </MotionButton>
    ))}
  </>
);

const MinimizedSidebarContent = ({ buttons, navigate }) => (
  <MotionStack spacing="4" mt={16} >
    {buttons.map((btn, index) => (
      <MotionIconButton
        key={index}
        icon={btn.icon}
        onClick={() => navigate(btn.route)}
        aria-label={btn.label}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        bg="#F4B860"
        color="black"
        _hover={{ bg: '#d7a247' }}
      />
    ))}
  </MotionStack>
);

export default Sidebar;
