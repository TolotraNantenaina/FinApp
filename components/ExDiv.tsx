import React from 'react';
import { withExpoSnack } from 'nativewind';
import { styled } from 'nativewind';
import { View, Text, Image, Pressable } from 'react-native';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledPressable = styled(Pressable);

const ExDiv = () => {
    return (
        // <StyledView className="flex font-sans">
        //     <StyledView className="flex-none w-48 relative">
        //         <StyledImage source={{ uri: "/classic-utility-jacket.jpg" }} className="absolute inset-0 w-full h-full object-cover" />
        //     </StyledView>
        //     <StyledView className="flex-auto p-6">
        //         <StyledView className="flex flex-wrap">
        //             <StyledText className="flex-auto text-lg font-semibold text-slate-900">
        //                 Utility Jacket
        //             </StyledText>
        //             <StyledText className="text-lg font-semibold text-slate-500">
        //                 $110.00
        //             </StyledText>
        //             <StyledText className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
        //                 In stock
        //             </StyledText>
        //         </StyledView>
        //         <StyledView className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
        //             <StyledView className="space-x-2 flex text-sm">
        //                 {['xs', 's', 'm', 'l', 'xl'].map(size => (
        //                     <StyledPressable key={size} className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
        //                         <StyledText>{size.toUpperCase()}</StyledText>
        //                     </StyledPressable>
        //                 ))}
        //             </StyledView>
        //         </StyledView>
        //         <StyledView className="flex space-x-4 mb-6 text-sm font-medium">
        //             <StyledView className="flex-auto flex space-x-4">
        //                 <StyledPressable className="h-10 px-6 font-semibold rounded-md bg-black text-white">
        //                     <StyledText>Buy now</StyledText>
        //                 </StyledPressable>
        //                 <StyledPressable className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900">
        //                     <StyledText>Add to bag</StyledText>
        //                 </StyledPressable>
        //             </StyledView>
        //             <StyledPressable className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200" aria-label="Like">
        //                 <svg width="20" height="20" fill="currentColor" aria-hidden="true">
        //                     <path fillRule="evenodd" clipRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
        //                 </svg>
        //             </StyledPressable>
        //         </StyledView>
        //         <StyledText className="text-sm text-slate-700">
        //             Free shipping on all continental US orders.
        //         </StyledText>
        //     </StyledView>
        // </StyledView>

        <StyledView className="container h-12 justify-center bg-slate-300 items-center">
            <StyledText className="text-slate-800">Try resizing me! 🎉</StyledText>
        </StyledView>
    );
}

export default withExpoSnack(ExDiv);